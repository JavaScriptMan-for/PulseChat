export interface FormData {
  email: string;
  password: string;
}
export interface RegisterData extends FormData {
  name: string,
  gender: "man" | "woman"
}