import { FC } from 'react';
import "@styles/main.scss"
import { useParams } from 'react-router-dom';


import Chat from "@components/main/Chat"
import ChatsList from '@components/main/ChatsList';

const Main_page:FC = () => {

  const { chat_id } = useParams();


  return (
    <div id='Main'>
      <ChatsList />
      <Chat chat_id={chat_id}/>
    </div>
  )
}

export default Main_page;