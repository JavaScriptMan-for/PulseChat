import { FC, useEffect } from "react";
import { setIsAuth, setIsUserData } from "@slices-my/auth.reducer";
import { useAppDispatch } from "@slices-my/store";
import Cookies from "js-cookie";

const Logout: FC = () => {
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(setIsAuth(false))
        dispatch(setIsUserData(null))
        Cookies.remove('jwt')
        
    }, [])
    return (
        <>
            
        </>
    )
}

export default Logout