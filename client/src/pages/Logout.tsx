import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setIsAuth, setIsUserData } from "@slices-my/auth.reducer";
import { useAppDispatch } from "@slices-my/store";
import Cookies from "js-cookie";

const Logout: FC = () => {
    const dispatch = useAppDispatch();
    const nav = useNavigate()

    useEffect(() => {
        dispatch(setIsAuth(false))
        dispatch(setIsUserData(null))
        Cookies.remove('jwt')
        nav('/login')
    }, [])
    return (
        <>
            
        </>
    )
}

export default Logout