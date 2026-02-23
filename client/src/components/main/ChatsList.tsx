import { FC, useState, useEffect } from "react";
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

    const {chat_id} = useParams()

    const nav = useNavigate()

    const dispatch = useAppDispatch()

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['get-contacts'],
        queryFn: ContactsMethods.get_contacts
    })

    const [chatIdsArr, setChatIdsArr] = useState<string[]>([])


    const [filterContacts, setFilterContacts] = useState<Contacts[]>([])

    const query = useAppSelector((selector) => selector.search.query);

    const onStartChat = (chat_id: string) => {
        nav(`/chats/${chat_id}`)
    }

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

        console.log(filterContacts)

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
                        <span className="bar">Привет! Как дела?</span>
                    </div>
                    <div className="other_info">
                        <span className="time">17:30</span>
                        <span className="int-messages">1</span>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default ChatsList