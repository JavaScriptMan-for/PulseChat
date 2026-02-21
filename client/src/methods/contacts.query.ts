import { ServerData, ContactsServerData, ContactAddServerDataType, ContactAddDataType } from "@types-my/query-type";
import Cookies from "js-cookie";


export default abstract class ContactsMethods {
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