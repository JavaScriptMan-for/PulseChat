import { FC, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { setChatsId } from "@slices-my/chat.reducer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@slices-my/store";
import ContactsMethods from "@methods/contacts.query";
import { Contacts } from "@types-my/query-type";
import { useAppSelector } from "@slices-my/store";

import user_img from "/img/user.png"

const ChatsList: FC = () => {
    const messages = useAppSelector((state) => state.chat.messages)
    const {chat_id} = useParams()

    const nav = useNavigate()

    const dispatch = useAppDispatch()

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['get-contacts'],
        queryFn: ContactsMethods.get_contacts
    })

    const last_messages_query = useQuery({
        queryKey: ['get-last-messages'],
        queryFn: ContactsMethods.get_last_messages
    })

    const [chatIdsArr, setChatIdsArr] = useState<string[]>([])


    const [filterContacts, setFilterContacts] = useState<Contacts[]>([])

    const query = useAppSelector((selector) => selector.search.query);


    const onStartChat = (chat_id: string) => {
        nav(`/chats/${chat_id}`)
    }
        type WhoGet = 'last_message' | 'last_time' | 'last_date'
        const getLastMessage = useCallback((chat_id: string | undefined, who_get: WhoGet): string | undefined => {
        if(!chat_id || !last_messages_query.data) return;

        const last_messages = last_messages_query.data;

        for(let i = 0; i < last_messages.length; i++) {
            const correct_message = last_messages[i]
            if(correct_message._id === chat_id) {
                if(correct_message.lastMessage.length < 15) {
                    if(who_get === 'last_message') {
                        return correct_message.lastMessage.slice(0, 15)
                    } else if(who_get === 'last_time') {
                        return correct_message.lastMessageTime
                    } else if(who_get === 'last_date') {
                        return correct_message.lastMessageDate
                    }
                } else {
                    if(who_get === 'last_message') {
                        return `${correct_message.lastMessage.slice(0, 15)}...`
                    } else if(who_get === 'last_time') {
                        return correct_message.lastMessageTime
                    } else if(who_get === 'last_date') {
                        return correct_message.lastMessageDate
                    }
                }
            }
        }
    }, [last_messages_query])

    useEffect(() => {
        last_messages_query.refetch()
    }, [messages])

    useEffect(() => {
        if(!data?.contacts) {
            refetch()
            return
        }
        if(query === "") {
            setFilterContacts(data.contacts)
        } else {
            setFilterContacts(data.contacts.filter(contact => contact.participant_2.toLowerCase().includes(query.toLowerCase())))
        }
    }, [query, data])

    useEffect(() => {
        if(filterContacts.length === 0) return

        const arr: string[] = []

        for(let i = 0; i < filterContacts.length; i++) {
            arr.push(filterContacts[i].chat_id)
        }

        setChatIdsArr(arr)
    }, [filterContacts])

    useEffect(() => {
        dispatch(setChatsId(chatIdsArr))
    }, [chatIdsArr])


    return (
        <div id="chats-panel">
            { data && !isLoading && !isError &&
                filterContacts.map((contact: Contacts) =>
                <div onClick={() => onStartChat(contact.chat_id)} className={`contact-box ${contact.chat_id === chat_id ? 'active-contact-box' : 'no-active-contact-box'}`} key={contact._id}>
                    <img className="avatar" src={user_img} alt="user-img" />
                    <div className="contact-info">
                        <span className="name">{contact.participant_2}</span>
                        <span className="bar">{getLastMessage(contact.chat_id, 'last_message')}</span>
                    </div>
                    <div className="other_info">
                        <span className="time">{getLastMessage(contact.chat_id, 'last_time')}</span>
                        <span className="int-messages">1</span>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default ChatsList