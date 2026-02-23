import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatStateType } from "../types/redux-type"

    const initialState: ChatStateType  = {
        chatsId: []  
    };

  const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatsId(state, actions: PayloadAction<string[]>) {
            state.chatsId = actions.payload
        }
    },
     });

export const { setChatsId } = chat.actions;

export default chat.reducer;