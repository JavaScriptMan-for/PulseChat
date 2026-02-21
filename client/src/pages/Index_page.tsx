import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index_page: FC = () => {
    const nav = useNavigate();

    useEffect(() => {
        nav('/chats')
    }, [])

    return (
        <>
            
        </>
    )
}

export default Index_page