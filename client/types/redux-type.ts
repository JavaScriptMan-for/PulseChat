import { JwtUserType } from "./query-type"

export interface AuthData {
        gender: "man" | 'woman',
        name: string,
        email: string,
        userId: string
}
export interface AuthStateType {
    isAuth: boolean,
    auth_data: JwtUserType | null
}
export interface SearchStateType {
    query: string
}