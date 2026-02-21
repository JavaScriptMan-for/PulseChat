import { LoginAndRegisterServerData, LoginData, RegisterData, ServerData } from "@types-my/query-type";
import { SuccessAuthType } from "@types-my/query-type";
import Cookies from "js-cookie";

export abstract class AuthMethods {
    public static async get_auth_data(): Promise<SuccessAuthType> {
        const req = await fetch('/api/auth', {
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`
            }
        })
        const res: ServerData<SuccessAuthType> = await req.json();
        
        if(!req.ok) throw new Error(res.message)

        return res.data
    }

    public static async login(data: LoginData): Promise<LoginAndRegisterServerData> {
        const req = await fetch('/api/login', {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res: ServerData<LoginAndRegisterServerData> = await req.json()

        if(!req.ok) throw new Error(res.message)

        return res.data
    }

    public static async register(data: RegisterData): Promise<LoginAndRegisterServerData> {
        const req = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res: ServerData<LoginAndRegisterServerData> = await req.json();

        if(!req.ok) throw new Error(res.message)

        return res.data
    }
 }