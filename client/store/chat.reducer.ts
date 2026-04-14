import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatStateType, Payload } from "../types/redux-type"
import { UnreadMessageType } from '@types-my/query-type';



    const initialState: ChatStateType  = {
        chatsId: [],
        messages: [],
        unread_messages: []
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
            time: action.payload.time,
            user_id: action.payload.user_id
        })
       },
       setUnreadMessages(state, action: PayloadAction<UnreadMessageType[]>) {
        state.unread_messages = action.payload
       }
    },
     });

export const { setChatsId, addMessage, setUnreadMessages } = chat.actions;

export default chat.reducer;