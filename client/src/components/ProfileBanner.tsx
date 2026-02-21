import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import user_img from "/img/user.png"
import arrow_img from "/img/arrow.svg"

import { useAppSelector } from "@slices-my/store";

const ProfileBanner: FC = () => {
    const auth_data = useAppSelector((selector) => selector.auth.auth_data)

    const [activate, setActivate] = useState<boolean>(false)

    const onClick = () => {
        setActivate((prev) => !prev)
    }
    const close = () => {
        setActivate(false)
    }

    return (
        <div id="dialog-store">
        <div onClick={onClick} id="profile-bar">
            <img src={user_img} alt="user" />
            {auth_data && <span>{auth_data.name}</span> }
            <img className={`${activate ? 'activate' : 'no-activate'}`} id="arrow_img" src={arrow_img} alt="↓" />
        </div>
            { activate && 
            <ul onClick={close} id="dialog">
                <li><NavLink to="/profile">Мой профиль</NavLink></li>
                <li><NavLink to="#">Выйти</NavLink></li>
            </ul>
            }
        </div>
    )
}

export default ProfileBanner