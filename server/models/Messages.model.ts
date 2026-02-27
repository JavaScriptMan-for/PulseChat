import { model, Schema } from "mongoose";

const Message = new Schema({
    chat_id: {type: String, required: true},
    user_id: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true}
})

export default model('Message', Message)