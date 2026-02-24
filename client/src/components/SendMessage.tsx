import { FC, useState } from "react";
import { socket } from '../socket'
import { useParams } from "react-router-dom";


import smile_img from "/img/chat/smile.svg"
import voice_img from "/img/chat/voice-message.svg"
import reinforse_img from "/img/chat/reinforse.svg"
import send_img from "/img/chat/send.png"

interface Props {
  socketId: string | null,
}

const SendMessage: FC<Props> = ({ socketId }) => {
    const [message, setMessage] = useState<string>('')
    const { chat_id } = useParams()


    const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const send = () => {
      if(!message || !chat_id || !socketId) return;

          socket.emit("send_message", {
            chat_id: chat_id,
            message,
            socketId          
            });
        setMessage('')
    }


  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

    return (
        <div id="send-message">
            <img id="smile" src={smile_img} alt="smiles" />
            <input onKeyDown={(e) => onPressEnter(e)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTyping(e)} value={message} placeholder="Введите сообщение..." type="text" />
            <div id="part">
            <img id="voice" src={voice_img} alt="voice" />
                <img id="reinforce" src={reinforse_img} alt="reinforse" />
                <button onClick={send}>
                    <img src={send_img} alt="send"/>
                </button>
            </div>
        </div>
    )
}

export default SendMessage