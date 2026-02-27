import { model, Schema } from "mongoose";

const Contact = new Schema({
    my_userId: {type: String, required: true},
    userId: {type: String, required: true},
    participant_1: {type: String, required: true},
    participant_2: {type: String, required: true},
    chat_id: {type: String, required: true},
})

export default model('Contact', Contact)