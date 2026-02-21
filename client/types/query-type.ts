import { AuthStateType } from "./redux-type";
export interface FullAuthData extends AuthStateType {}

export interface ServerData<T> {
    message?: string,
    data: T
}

export interface JwtUserType {
  userId: string;
  email: string,
  name: string,
  gender: "man" | "woman"
}

export interface SuccessAuthType {
    user: JwtUserType,
    isAuth: boolean
}

/**@see RegisterAndLogin */
//Client
export interface LoginData {
    email: string,
    password: string
}

export interface RegisterData extends LoginData {
    name: string,
    gender: "man" | "woman"
}
//Server
export interface LoginAndRegisterServerData {
    jwt: string
}
export type Contacts = {
    _id: string
    my_userId: string,
    userId: string,
    participant_1: string,
    participant_2: string,
    chat_id: string
}
export interface ContactsServerData {
    contacts: Contacts[]
}

export interface ContactAddDataType {
    userId: string,
    participant_2: string
}
export type ContactAddServerDataType = {
    userId: string
}