import { FC } from "react";
import ChatsNavLink from "@components/ChatNavLink";

import chat_img from "/img/nav/chat.svg"
import contacts_img from "/img/nav/contacts.svg"

const Panel: FC = () => {


    return (
        <nav id="panel">
            <ChatsNavLink src={chat_img} alt="chat" to="/chats"/>
            <ChatsNavLink src={contacts_img} alt="chat" to="/contacts"/>
        </nav>
    )
}

export default Panel