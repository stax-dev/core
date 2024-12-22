import asyncio
import wave
import io
from typing import Optional, AsyncGenerator
from openai import AsyncOpenAI
import config

client = AsyncOpenAI(
    api_key=config.openai_api_key,
    base_url=config.openai_api_base if config.openai_api_base else None
)

class RealtimeHandler:
    def __init__(self, model="gpt-4o-realtime-preview-2024-12-17"):
        self.model = model
        self.session = None
        self.audio_queue = asyncio.Queue()
        self.text_queue = asyncio.Queue()
        self._running = False
        
    async def start_call(self, call):
        """Initialize a realtime session when a call starts"""
        self.session = await client.realtime.sessions.create(
            model=self.model,
            voice_mode="duplex",  # Enable two-way voice
            audio_settings={
                "sampling_rate": 24000,
                "audio_format": "wav",
                "channels": 1
            }
        )
        self._running = True
        
        # Start background tasks
        asyncio.create_task(self._process_audio())
        asyncio.create_task(self._process_text())
        
    async def _process_audio(self):
        """Background task to process audio queue"""
        while self._running:
            try:
                audio_chunk = await self.audio_queue.get()
                await self.session.audio.send(audio_chunk)
                
                # Get model's audio response
                async for response in self.session.audio.iter():
                    # Convert response to WAV format for Telegram
                    wav_bytes = self._convert_to_wav(response.chunk)
                    yield wav_bytes
                    
            except Exception as e:
                print(f"Audio processing error: {e}")
                
    async def _process_text(self):
        """Background task to process text messages"""
        while self._running:
            try:
                text = await self.text_queue.get()
                await self.session.text.send(text)
                
                async for response in self.session.text.iter():
                    print(f"Model response: {response.text}")
                    # Handle text responses (e.g., send as messages)
                    
            except Exception as e:
                print(f"Text processing error: {e}")
    
    def _convert_to_wav(self, audio_bytes: bytes) -> bytes:
        """Convert audio bytes to WAV format"""
        with io.BytesIO() as wav_io:
            with wave.open(wav_io, 'wb') as wav_file:
                wav_file.setnchannels(1)
                wav_file.setsampwidth(2)  # 16-bit
                wav_file.setframerate(24000)
                wav_file.writeframes(audio_bytes)
            return wav_io.getvalue()
    
    async def handle_voice(self, audio_chunk: bytes):
        """Add voice data to processing queue"""
        if not self.session:
            return
        await self.audio_queue.put(audio_chunk)
    
    async def handle_text(self, text: str):
        """Add text message to processing queue"""
        if not self.session:
            return
        await self.text_queue.put(text)
    
    async def end_call(self):
        """Clean up when call ends"""
        self._running = False
        if self.session:
            await self.session.close()
            self.session = None