import Cookies from "js-cookie";
import { MessageType, ServerData } from '@types-my/query-type'

type ServerMessageData = {
    messages: MessageType[]
}

abstract class ChatMethods {
    public static async get_messages(): Promise<MessageType[]> {
        const chat_id = Cookies.get('chat_id')

        if(chat_id === '') throw new Error("Chat ID не найден")

        const req = await fetch(`/api/get-messages/${chat_id}`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`
            }
        })

        const res: ServerData<ServerMessageData> = await req.json();

        if(!req.ok) throw new Error(res.message)

        return res.data.messages
    }
}

export default ChatMethods;