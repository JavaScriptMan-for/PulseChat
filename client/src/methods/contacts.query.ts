import { ServerData, ContactsServerData, ContactAddServerDataType, ContactAddDataType, LastMessage, ContactServerData, Contacts } from "@types-my/query-type";
import Cookies from "js-cookie";


type ServerLastMessageData = {
    last_messages: LastMessage[]
}

export default abstract class ContactsMethods {
    public static async get_contact(chat_id: string): Promise<Contacts> {
        const req = await fetch(`/api/get-contact/${chat_id}`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`
            }
        })

        const res: ServerData<ContactServerData> = await req.json()

        if(!req.ok) throw new Error(res.message)

        return res.data.contact
    }

    public static async get_contacts() {
        const req = await fetch('/api/get-contacts', {
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`
            }
        });

        const res: ServerData<ContactsServerData> = await req.json();

        if(!req.ok) throw new Error(res.message)

        return res.data
    }

    public static async get_last_messages(): Promise<LastMessage[]> {
        const req = await fetch('/api/get-last-messages', {
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`
            }
        })

        const res: ServerData<ServerLastMessageData> = await req.json();

        if(!req.ok) throw new Error(res.message)

        return res.data.last_messages;
    }

    public static async add_contact(data: ContactAddDataType): Promise<ContactAddServerDataType> {
        const req = await fetch('/api/add-contact', {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`,
                "Content-Type": "application/json"
            }
        })

        const res: ServerData<ContactAddServerDataType> = await req.json();

        if(!req.ok) throw new Error(res.message)

        return res.data
    }
}