import { FC } from "react";
import LoginInfo from "@components/auth/LoginInfo";
import RegisterForm from "@components/auth/RegisterForm";

const Register_page: FC = () => {
    return (
        <>
           <main className="AuthPages">
                <LoginInfo text="Регистрация"/>
                <RegisterForm />
           </main>
        </>
    )
}

export default Register_page