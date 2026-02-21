import "@styles/contacts.scss"
import { FC, useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import ContactsMethods from "@methods/contacts.query";
import { useForm } from "react-hook-form";
import { ContactAddDataType } from "@types-my/query-type";
import Loading from "@components/Loading";
import ServerError from "@components/ServerError";

const Contacts_page:FC = () => {

  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { register, handleSubmit, reset } = useForm<ContactAddDataType>()

  const mutation = useMutation({
    mutationKey: ['add-contact'],
    mutationFn: ContactsMethods.add_contact,

    onSuccess: (data) => {
      console.log('Контакт успешно добавлен', data.userId);
      setIsSuccess(true)
    },
    onError: () => {
      setIsSuccess(false)
    }
  })

  const onSubmit = (data: ContactAddDataType) => {
    console.log(data)
    mutation.mutate(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id='Contacts'>
       <h1>Добавить в контакты</h1>
        <input {...register('userId')} placeholder="Введите user ID пользователя" type="text" />
        <input {...register('participant_2')} placeholder="Введите имя контакта" type="text" />
        <button type="submit">Добавить</button>
        {mutation.isPending && <Loading />}
        {mutation.isError && <ServerError>{mutation.error.message}</ServerError>}
        {isSuccess && <p className="success">Контакт успешно добавлен</p>}
    </form>
  )
}

export default Contacts_page;