import Cookies from "js-cookie";
import { MessageType, UnreadMessageType, ServerData } from '@types-my/query-type'

type ServerMessageData = {
    messages: MessageType[]
}
type ServerUnreadMessageData = {
    unread_messages: UnreadMessageType[]
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
    public static async get_unread_messages(chat_ids: string[]): Promise<UnreadMessageType[]> {
        const req = await fetch('/api/get-unread-messages', {
            method: "POST",
            body: JSON.stringify({ chat_ids }),
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`,
                "Content-Type": "application/json"
            }
        })

        const res: ServerData<ServerUnreadMessageData> = await req.json()

        if(!req.ok) throw new Error(res.message)

        return res.data.unread_messages
    }
}

export default ChatMethods;