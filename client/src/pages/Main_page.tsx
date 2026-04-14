import { FC, useEffect } from 'react';
import "@styles/main.scss"
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '@slices-my/store';
import { useAppDispatch } from '@slices-my/store';
import ChatMethods from '@methods/chat.query';

import Chat from "@components/main/Chat"
import ChatsList from '@components/main/ChatsList';
import { setUnreadMessages } from '@slices-my/chat.reducer';

const Main_page:FC = () => {
  const dispatch = useAppDispatch()

  const chat_ids = useAppSelector((state) => state.chat.chatsId)

  const unread_messages = useMutation({
    mutationKey: ['get-unread-messages'],
    mutationFn: ChatMethods.get_unread_messages
  })

  const { chat_id } = useParams();

  useEffect(() => {
    unread_messages.mutate(chat_ids)
  }, [chat_ids])

  useEffect(() => {
    if(!unread_messages.isPending && !unread_messages.isError && unread_messages.data) {
      dispatch(setUnreadMessages(unread_messages.data))
    }
  }, [unread_messages.data])

  return (
    <div id='Main'>
      <ChatsList />
      <Chat chat_id={chat_id}/>
    </div>
  )
}

export default Main_page;