import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@slices-my/store";


const NoAuthLayout: FC = () => {

    const nav = useNavigate();
    const isAuth = useAppSelector((selector) => selector.auth.isAuth)

    useEffect(() => {
        if(isAuth) nav('/chats')
    }, [isAuth])

    return (
        <>
            <Outlet />
        </>
    )
}

export default NoAuthLayout