import { FC } from "react";
import '@styles/profile.scss'
import user_img from "/img/user.png"
import { useAppSelector } from "@slices-my/store";

const Profile_page: FC = () => {
    const auth_data = useAppSelector((selector) => selector.auth.auth_data)

    return (
        <div id="Profile">
            <div className="objects">
                <img src={user_img} alt="" />
                <span className="name">{auth_data?.name || 'Имя не найдено'}</span>
            </div>
            <div className="objects">
                <span className="key">Пол</span>
                <span className="value">{auth_data?.gender === 'man' ? "Мужской" : 'Женский'}</span>
            </div>
            <div className="objects">
                <span className="key">User ID</span>
                <span className="value">{auth_data?.userId || 'User ID не найден'}</span>
            </div>
            <div className="objects">
                <span className="key">E-mail</span>
                <span className="value">{auth_data?.email || 'Email не найден'}</span>
            </div>
        </div>
    )
}

export default Profile_page