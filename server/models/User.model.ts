import { UserType } from "@types-my/user.type";
import { model, Schema } from "mongoose";

const User = new Schema<UserType>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: String, required: true}
})

export default model('User', User)