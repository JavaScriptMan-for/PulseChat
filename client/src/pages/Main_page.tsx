import { FC } from 'react';
import "@styles/main.scss"


import Chat from "@components/main/Chat"
import ChatsList from '@components/main/ChatsList';

const Main_page:FC = () => {

  return (
    <div id='Main'>
      <ChatsList />
      <Chat />
    </div>
  )
}

export default Main_page;