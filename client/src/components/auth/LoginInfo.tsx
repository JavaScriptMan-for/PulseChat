import { FC } from "react";
import LiMarks from "./LiMarks";
import fake_form_img from "/img/auth_icons/fake_form.png"

interface Props {
    text: "Вход" | "Регистрация"
}

const LoginInfo: FC<Props> = ({ text }) => {
    return (
        <div className="info">
            <h1>Pulse Chat. <br />
            Общение, звонки
            </h1>
            <ul>
                <LiMarks>Безопасность</LiMarks>
                <LiMarks>Удобный интерфейс</LiMarks>
                <LiMarks>Оптимизация под любые устройства</LiMarks>
            </ul>
            <div id="fake-form">
                <h1>{text}</h1>
                <span className="unimportant-text">
                    Pulse Chat - оптимизированный мессенджер
                    под любые задачи
                </span>
                <img draggable="false" src={fake_form_img} alt="Error" />
            </div>
        </div>
    )
}

export default LoginInfo