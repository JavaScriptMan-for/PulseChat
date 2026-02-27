import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@slices-my/store";
import Panel from '@components/main/Panel';
import Search from "@components/main/Search";

const AuthLayout: FC = () => {



    const nav = useNavigate();
    const isAuth = useAppSelector((selector) => selector.auth.isAuth)

    useEffect(() => {

        if(!isAuth) {
            nav('/login')
        }
    }, [isAuth])

    return (
        <div id="page-layout">
        <Search />
        <div id="layout-panel">
            <Panel />
            <Outlet />
        </div>
        </div>
    )
}

export default AuthLayout