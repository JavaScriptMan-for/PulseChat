import { FC, useEffect, useState } from "react";
import { useAppSelector } from "@slices-my/store";

import SendMessage from "@components/SendMessage";

interface Props {
    chat_id: string | undefined
}

const Chat: FC<Props> = ({ chat_id }) => {

    const chats_id = useAppSelector((state) => state.chat.chatsId)

    const [isChat, setIsChat] = useState<boolean>(false)

    useEffect(() => {
    if(!chat_id) {
        setIsChat(false)
        return
    }
        
    const exists = chats_id.some(id => String(id) === String(chat_id));
    setIsChat(exists);

    }, [chats_id, chat_id])

    useEffect(() => {
        console.log(isChat)
    }, [isChat])
    return (
        <div id="chat">
            {chat_id}

            {isChat && <SendMessage />}
        </div>
    )
}

export default Chat