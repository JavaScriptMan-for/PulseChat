
type Gender = "man" | 'woman'

export interface UserType {
    email: string,
    name: string,
    gender: Gender,
    password: string
}
export interface ContactUserType {
    my_userId: string,
    userId: string,
    participant_1: string,
    participant_2: string,
    chat_id: string
}