import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@slices-my/store";
import { MessageType } from "@types-my/query-type";
import { useQuery } from "@tanstack/react-query";
import ChatMethods from "@methods/chat.query";
import Cookies from "js-cookie";
import { socket } from "../../socket";
import { useAppDispatch } from "@slices-my/store";
import { addMessage } from "@slices-my/chat.reducer";
import { nanoid } from "nanoid";

import SendMessage from "@components/SendMessage";
import { Payload } from "@types-my/redux-type";

interface Props {
  chat_id: string | undefined;
}

interface SocketMessage {
  ok: boolean;
  message: string;
  socketId: string;
  chatId: string;
}

const Chat: FC<Props> = ({ chat_id }) => {


    const messages_query = useQuery({
      queryKey: ['get-messages'],
      queryFn: ChatMethods.get_messages
    })

    const endRef = useRef<HTMLDivElement | null>(null);

  const [isChat, setIsChat] = useState<boolean>(false);
  const [socketId, setSocketId] = useState<string | null>(null);
  const messages = useAppSelector((state) => state.chat.messages);

  const chats_id = useAppSelector((state) => state.chat.chatsId);
  const user = useAppSelector((state) => state.auth.auth_data)
  const dispatch = useAppDispatch();

    const scrollToBottom = (behavior: ScrollBehavior) => {
        endRef.current?.scrollIntoView({ behavior: behavior });
    };

    useEffect(() => {
      chat_id ? Cookies.set('chat_id', chat_id) : Cookies.set('chat_id', '')
    }, [chat_id])

    useEffect(() => {
        scrollToBottom('auto')
    }, [chat_id])

  useEffect(() => {
    function onNewMessage(msg: Payload) {
      dispatch(addMessage(msg));
    }

    socket.on("new_message", onNewMessage);

    return () => {
      socket.off("new_message", onNewMessage);
    };
  }, []);

  useEffect(() => {

    socket.emit("join", chat_id, (res: SocketMessage) => {
      if (!res.ok) throw new Error(res.message);

      setSocketId(res.socketId);
    });
  }, [chat_id]);

  useEffect(() => {
    scrollToBottom('smooth')
  },[messages])

  useEffect(() => {
    if (!chat_id) {
      setIsChat(false);
      return;
    }
    const exists = chats_id.some((id) => String(id) === String(chat_id));
    setIsChat(exists);
  }, [chats_id, chat_id]);

      useEffect(() => {
      messages_query.refetch()
    }, [chat_id])



  return (
    <div id="chat">
      <div id="chat-area">

      { messages_query.data && !messages_query.isLoading && !messages_query.isError && chat_id &&
        messages_query.data
        .filter((messages: MessageType) => messages.chat_id === chat_id)
        .map((message: MessageType) =>
          <div key={nanoid()} className={`${message.user_id === user?.userId ? 'my' : 'no-my'} message-box`}>
              <span className="message">{message.message}</span>
              <span className="time">{message.time}</span>            
          </div>
        )
      }

        {messages &&
          socketId &&
          messages
          .filter((message: Payload) => message.chat_id === chat_id)
          .map((message: Payload) => (
            <div className={`${message.socketId === socketId ? 'my' : 'no-my'} message-box`} key={nanoid()}>
              <span className="message">{message.message}</span>
              <span className="time">{message.time}</span>
            </div>
          ))}
          <div id="null" ref={endRef}></div>
      </div>
      {isChat && <SendMessage socketId={socketId}/>}
    </div>
  );
};

export default Chat;
