import { useParams } from "react-router-dom";
import css from "./Chat.module.css";
import { Avatar, IconButton } from "@material-ui/core";

export default function Chat() {
  const { id } = useParams();
  return (
    <>
      <h1>Chat {id}</h1>
      <div className={css.chat}>
        <div className={css.chat_messages}>
          <Avatar />
          <div className={css.chat_messages_message}>
            <h3>Room name</h3>
            <p>Last seen at...</p>
          </div>
          <div className={css.chat_messages_message}>
            <i className={`${css.fas} ${css.fa_search}  ${"fas fa-search"}`}></i>
            <i className={`${css.fas} ${css.fa_ellipsis_v
              }  ${"fas fa-ellipsis-v"}`}></i>
          </div>
        </div>
        <div className={css.chat_body}>
          <p className={css.chat_message}>
            <span className={css.chat_name}>Room name</span>
            This is a message
            <span className={css.chat_timestamp}>timestamp</span>
          </p>
        </div>
        <div className={css.chat_footer}>
          <i className={`${css.fas} ${css.fa_smile}  ${"fas fa-smile"}`}></i>
          <form>
            <input placeholder="Type a message" type="text" />
            <button type="submit">Send a message</button>
          </form>
          <i className={`${css.fas} ${css.fa_microphone
            }  ${"fas fa-microphone"}`}></i>
        </div>
      </div>
    </>
  );
}
