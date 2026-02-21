import "@styles/login.scss"
import { FC } from "react";
import LoginForm from "@components/auth/LoginForm";
import LoginInfo from "@components/auth/LoginInfo";

const Login_page: FC = () => {
    return (
        <main className="AuthPages">
            <LoginInfo text="Вход"/>
            <LoginForm />
        </main>
    )
}

export default Login_page