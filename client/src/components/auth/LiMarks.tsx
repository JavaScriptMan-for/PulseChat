import { FC, ReactNode } from "react";
import marks_img from "/img/auth_icons/mark.svg";

interface Props {
    children: ReactNode
}

const LiMarks: FC<Props> = ({ children }) => {
    return (
        <li>
        <img src={marks_img} alt="✓" />
        { children }
        </li>
    )
}

export default LiMarks