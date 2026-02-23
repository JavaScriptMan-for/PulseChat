import { FC } from "react";
import smile_img from "/img/chat/smile.svg"
import voice_img from "/img/chat/voice-message.svg"
import reinforse_img from "/img/chat/reinforse.svg"
import send_img from "/img/chat/send.png"

const SendMessage: FC = () => {
    return (
        <div id="send-message">
            <img src={smile_img} alt="smiles" />
            <img src={voice_img} alt="voice" />
            <img src={reinforse_img} alt="reinforse" />
            <input placeholder="Введите сообщение..." type="text" />

            <button>
                <img src={send_img} alt="send"/>
            </button>
        </div>
    )
}

export default SendMessage