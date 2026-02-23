import { FC } from "react";
import "@styles/register.scss"
import Input from "@components/auth/Input";
import Select from "./Select";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { RegisterData } from "@types-my/form.type"
import { AuthMethods } from "@methods/auth.query";
import { useMutation } from "@tanstack/react-query";

import email_img from "/img/auth_icons/email.svg";
import password_img from "/img/auth_icons/password.svg";
import name_img from "/img/auth_icons/name.svg"
import genders_img from "/img/auth_icons/gender.svg"
import Loading from "@components/Loading";
import ServerError from "@components/ServerError";


const RegisterForm: FC = () => {
const { register, handleSubmit, setValue, reset } = useForm<RegisterData>();


const mutation = useMutation({
  mutationKey: ['register'],
  mutationFn: AuthMethods.register,
  
  onSuccess: (data) => {
    Cookies.set('jwt', data.jwt)
    location.reload()
  }
})

  const onSubmit = (data: RegisterData) => {
    console.log(data);
    mutation.mutate(data);
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Зарегистрироваться</h1>
      
      <Input
        type="text"
        icon={email_img}
        alt="email"
        registration={register("email")}
        >
        E-mail
        </Input>

        <Input
        type="text"
        icon={name_img}
        alt="name"
        registration={register("name")}
        >
        Name
        </Input>

    <Select
      icon={genders_img}
      alt="пол"
      registration={register("gender")}
      setValue={setValue}
      placeholder="Выберите пол"
      options={[
        { label: "Мужчина", value: "man" },
        { label: "Женщина", value: "woman" }
  ]}
    />


      <Input
        type="password"
        icon={password_img}
        alt="password"
        registration={register("password")}
      >
        Password
      </Input>

      <button className="submit-button" type="submit">Register</button>
      <Link className="link-auth" to="/login">Есть аккаунт?</Link>
      {mutation.isPending && <Loading />}
      {mutation.isError && <ServerError>{mutation.error.message}</ServerError>}
    </form>
  );
};

export default RegisterForm;