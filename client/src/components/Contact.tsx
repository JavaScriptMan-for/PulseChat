import { FC, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import ContactsMethods from "@methods/contacts.query";
import user_img from '/img/user.png'
import { useParams } from "react-router-dom";

const Contact: FC = () => {
    const { chat_id } = useParams()

    const mutation = useMutation({
        mutationKey: ['get-contact'],
        mutationFn: ContactsMethods.get_contact
    })

    useEffect(() => {
        if(!chat_id) return
        mutation.mutate(chat_id)
    }, [chat_id])

    return (
        <div id="contact">
          {mutation.data && !mutation.isPending &&
          <>
            <img src={user_img} alt="user" />
            <div id="name-and-event">
                <span id="name">{mutation.data.participant_2}</span>
                {/* <span id="event">User typing...</span>  */}
            </div>
          </> 
          }
        </div>
    )
}

export default Contact