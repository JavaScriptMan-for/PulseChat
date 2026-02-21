import { FC, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ContactsMethods from "@methods/contacts.query";
import { Contacts } from "@types-my/query-type";
import { useAppSelector } from "@slices-my/store";

import user_img from "/img/user.png"

const ChatsList: FC = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['get-contacts'],
        queryFn: ContactsMethods.get_contacts
    })


    const [filterContacts, setFilterContacts] = useState<Contacts[]>([])

    const query = useAppSelector((selector) => selector.search.query);

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


    return (
        <div id="chats-panel">
            { data && !isLoading && !isError &&
                filterContacts.map((contact: Contacts) =>
                <div className="contact-box" key={contact._id}>
                    <img className="avatar" src={user_img} alt="user-img" />
                    <span className="name">{contact.participant_2}</span>
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