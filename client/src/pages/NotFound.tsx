import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
    return (
        <div id="not-found">
            <h1>404</h1>
            <p>Такой страницы не существует</p>
            <Link to='/'>Вернуться на главную страницу</Link>
        </div>
    )
}

export default NotFound