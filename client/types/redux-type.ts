import { JwtUserType } from "./query-type"

export interface AuthData {
        gender: "man" | 'woman',
        name: string,
        email: string,
        userId: string
}
export interface AuthStateType {
    isAuth: boolean | null,
    auth_data: JwtUserType | null
}
export interface SearchStateType {
    query: string
}

   export interface Payload {
        chat_id: string,
        message: string,
        socketId: string
        date: string,
        time: string
    }

export interface ChatStateType {
    chatsId: string[],
    messages: Payload[],
}