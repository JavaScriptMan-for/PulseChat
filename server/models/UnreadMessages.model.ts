import { model, Schema } from "mongoose";

const UnreadMessage = new Schema({
    chat_id: {type: String, required: true},
    user_id: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    createdAt: {type: String, default: Date.now},
})

export default model('UnreadMessage', UnreadMessage)