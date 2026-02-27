import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatStateType, Payload } from "../types/redux-type"



    const initialState: ChatStateType  = {
        chatsId: [],
        messages: [],
    };

  const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatsId(state, actions: PayloadAction<string[]>) {
            state.chatsId = actions.payload
        },
       addMessage(state, action: PayloadAction<Payload>) {

        state.messages.push({
            message: action.payload.message,
            chat_id: action.payload.chat_id,
            socketId: action.payload.socketId,
            date: action.payload.date,
            time: action.payload.time
        })
       },
    },
     });

export const { setChatsId, addMessage } = chat.actions;

export default chat.reducer;