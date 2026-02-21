import { FC } from "react";
import { NavLink } from "react-router-dom";

interface Props {
    to: string,
    src: string,
    alt: string,
}

const ChatsNavLink: FC<Props> = ({ to, src, alt}) => {

    return (
        <NavLink className="nav-box" to={to}>
            <img src={src} alt={alt} />
        </NavLink>
    )
}

export default ChatsNavLink