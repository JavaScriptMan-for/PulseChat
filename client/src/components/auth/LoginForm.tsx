import { FC } from "react";
import Input from "@components/auth/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormData } from "@types-my/form.type"
import { useMutation } from "@tanstack/react-query";
import { AuthMethods } from "@methods/auth.query";
import Cookies from "js-cookie";
import ServerError from "@components/ServerError";
import Loading from "@components/Loading";

import email_img from "/img/auth_icons/email.svg";
import password_img from "/img/auth_icons/password.svg";


const LoginForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();


  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthMethods.login,

    onSuccess: (data) => {
      Cookies.set('jwt', data.jwt)
      location.reload()
    }
  })

  const onSubmit = (data: FormData) => {
    console.log(data);
    mutation.mutate(data);
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Войти</h1>
      
      <Input
        type="text"
        icon={email_img}
        alt="user"
        registration={register("email")}
        >
        E-mail
        </Input>
      

      <Input
        type="password"
        icon={password_img}
        alt="password"
        registration={register("password")}
      >
        Password
      </Input>

      <button className="submit-button" type="submit">Login</button>
      <Link className="link-auth" to="/register">Нет аккаунта?</Link>

      { mutation.isPending && <Loading /> }
      { mutation.isError && <ServerError>{mutation.error.message}</ServerError> }
    </form>
  );
};

export default LoginForm;