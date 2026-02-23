import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import auth_slice from "./auth.reducer"
import search_slice from "@slices-my/search.reducer"
import chat_slice from "@slices-my/chat.reducer"

const store = configureStore({
  reducer: {
    auth: auth_slice,
    search: search_slice,
    chat: chat_slice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store