import config
import tiktoken
from openai import AsyncOpenAI, OpenAIError

client = AsyncOpenAI(
    api_key=config.openai_api_key,
    base_url=config.openai_api_base if config.openai_api_base else None
)


OPENAI_COMPLETION_OPTIONS = {
    "temperature": 0.7,
    "max_tokens": 1000,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "request_timeout": 60.0
}


class ChatGPT:
    def __init__(self, model="gpt-3.5-turbo-16k"):
        assert model in {"gpt-3.5-turbo-16k", "gpt-4-1106-preview", "gpt-4o-2024-11-20", "gpt-4o-mini", "o1-mini", "o1"}, f"Unknown model: {model}"
        self.model = model

    async def send_message(self, message, dialog_messages=[], chat_mode="assistant"):
        if chat_mode not in config.chat_modes.keys():
            raise ValueError(f"Chat mode {chat_mode} is not supported")

        n_dialog_messages_before = len(dialog_messages)
        answer = None
        while answer is None:
            try:
                if self.model in {"gpt-3.5-turbo-16k", "gpt-4-1106-preview", "gpt-4o-2024-11-20", "gpt-4o-mini", "o1-mini", "o1"}:
                    messages = self._generate_prompt_messages(message, dialog_messages, chat_mode)
                    r = await client.chat.completions.create(
                        model=self.model,
                        messages=messages,
                        **OPENAI_COMPLETION_OPTIONS
                    )
                    answer = r.choices[0].message["content"]
                elif self.model == "text-davinci-003":
                    prompt = self._generate_prompt(message, dialog_messages, chat_mode)
                    r = await client.completions.create(
                        engine=self.model,
                        prompt=prompt,
                        **OPENAI_COMPLETION_OPTIONS
                    )
                    answer = r.choices[0].text
                else:
                    raise ValueError(f"Unknown model: {self.model}")

                answer = self._postprocess_answer(answer)
                n_input_tokens, n_output_tokens = r.usage.prompt_tokens, r.usage.completion_tokens
            except OpenAIError as e:  # too many tokens
                if len(dialog_messages) == 0:
                    raise ValueError("Dialog messages is reduced to zero, but still has too many tokens to make completion") from e

                # forget first message in dialog_messages
                dialog_messages = dialog_messages[1:]

        n_first_dialog_messages_removed = n_dialog_messages_before - len(dialog_messages)

        return answer, (n_input_tokens, n_output_tokens), n_first_dialog_messages_removed

    async def send_message_stream(self, message, dialog_messages=[], chat_mode="assistant"):
        if chat_mode not in config.chat_modes.keys():
            raise ValueError(f"Chat mode {chat_mode} is not supported")

        n_dialog_messages_before = len(dialog_messages)
        answer = None
        while answer is None:
            try:
                if self.model in {"gpt-3.5-turbo-16k", "gpt-4-1106-preview", "gpt-4o-2024-11-20", "gpt-4o-mini", "o1-mini", "o1"}:
                    messages = self._generate_prompt_messages(message, dialog_messages, chat_mode)
                    r_gen = await client.chat.completions.create(
                        model=self.model,
                        messages=messages,
                        stream=True,
                        **OPENAI_COMPLETION_OPTIONS
                    )

                    answer = ""
                    async for r_item in r_gen:
                        delta = r_item.choices[0].delta
                        if "content" in delta:
                            answer += delta.content
                            n_input_tokens, n_output_tokens = self._count_tokens_from_messages(messages, answer, model=self.model)
                            n_first_dialog_messages_removed = n_dialog_messages_before - len(dialog_messages)
                            yield "not_finished", answer, (n_input_tokens, n_output_tokens), n_first_dialog_messages_removed
                elif self.model == "text-davinci-003":
                    prompt = self._generate_prompt(message, dialog_messages, chat_mode)
                    r_gen = await client.completions.create(
                        engine=self.model,
                        prompt=prompt,
                        stream=True,
                        **OPENAI_COMPLETION_OPTIONS
                    )

                    answer = ""
                    async for r_item in r_gen:
                        answer += r_item.choices[0].text
                        n_input_tokens, n_output_tokens = self._count_tokens_from_prompt(prompt, answer, model=self.model)
                        n_first_dialog_messages_removed = n_dialog_messages_before - len(dialog_messages)
                        yield "not_finished", answer, (n_input_tokens, n_output_tokens), n_first_dialog_messages_removed

                answer = self._postprocess_answer(answer)

            except OpenAIError as e:  # too many tokens
                if len(dialog_messages) == 0:
                    raise e

                # forget first message in dialog_messages
                dialog_messages = dialog_messages[1:]

        yield "finished", answer, (n_input_tokens, n_output_tokens), n_first_dialog_messages_removed  # sending final answer

    def _generate_prompt(self, message, dialog_messages, chat_mode):
        prompt = config.system_intel + "\n\n"
        prompt += config.chat_modes[chat_mode]["prompt_start"]
        prompt += "\n\n"

        # add chat context
        if len(dialog_messages) > 0:
            prompt += "Chat:\n"
            for dialog_message in dialog_messages:
                prompt += f"User: {dialog_message['user']}\n"
                prompt += f"Assistant: {dialog_message['bot']}\n"

        # current message
        prompt += f"User: {message}\n"
        prompt += "Assistant: "

        return prompt

    def _generate_prompt_messages(self, message, dialog_messages, chat_mode):
        prompt = config.system_intel + "\n\n"
        prompt += config.chat_modes[chat_mode]["prompt_start"]

        messages = [{"role": "system", "content": prompt}]
        for dialog_message in dialog_messages:
            messages.append({"role": "user", "content": dialog_message["user"]})
            messages.append({"role": "assistant", "content": dialog_message["bot"]})
        messages.append({"role": "user", "content": message})

        return messages

    def _postprocess_answer(self, answer):
        answer = answer.strip()
        return answer

    def _count_tokens_from_messages(self, messages, answer, model="gpt-3.5-turbo-16k"):
        encoding = tiktoken.encoding_for_model(model)

        if model == "gpt-3.5-turbo-16k":
            tokens_per_message = 4  # every message follows <im_start>{role/name}\n{content}<im_end>\n
            tokens_per_name = -1  # if there's a name, the role is omitted
        elif model == "gpt-4-1106-preview":
            tokens_per_message = 3
            tokens_per_name = 1
        elif model == "gpt-4o-2024-11-20":
            tokens_per_message = 3
            tokens_per_name = 1
        elif model == "gpt-4o-mini":
            tokens_per_message = 3
            tokens_per_name = 1
        elif model == "o1-mini":
            tokens_per_message = 3
            tokens_per_name = 1
        elif model == "o1":
            tokens_per_message = 3
            tokens_per_name = 1
        else:
            raise ValueError(f"Unknown model: {model}")

        # input
        n_input_tokens = 0
        for message in messages:
            n_input_tokens += tokens_per_message
            for key, value in message.items():
                n_input_tokens += len(encoding.encode(value))
                if key == "name":
                    n_input_tokens += tokens_per_name

        n_input_tokens += 2

        # output
        n_output_tokens = 1 + len(encoding.encode(answer))

        return n_input_tokens, n_output_tokens

    def _count_tokens_from_prompt(self, prompt, answer, model="gpt-3.5-turbo-16k"):
        encoding = tiktoken.encoding_for_model(model)

        n_input_tokens = len(encoding.encode(prompt)) + 1
        n_output_tokens = len(encoding.encode(answer))

        return n_input_tokens, n_output_tokens


async def transcribe_audio(audio_file):
    r = await client.audio.transcribe("whisper-1", audio_file)
    return r["text"]


async def generate_images(prompt, n_images=1):
    r = await client.images.create(model="dall-e-3", prompt=prompt, n=n_images, size="1792x1024", quality="hd")
    image_urls = [item.url for item in r.data]
    return image_urls

async def analyze_image(image_path, instructions=None):
    # If instructions are provided, add them to the prompt
    if instructions:
        prompt = f"{prompt}\n\nInstructions: {instructions}"
    else:
        prompt = prompt
    r = await client.images.analyze(image=image_path, prompt=prompt)
    return r.text

async def generate_audio(prompt):
    r = await client.audio.speech.create(
        model="tts-1",
        voice="echo",
        input={"text": prompt}
    )
    return r.url


async def is_content_acceptable(prompt):
    r = await client.moderation.create(input=prompt)
    return not all(r.results[0].categories.values())
