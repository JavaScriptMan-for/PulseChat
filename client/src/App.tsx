import { FC, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AuthMethods } from '@methods/auth.query'
import Cookies from 'js-cookie'
import { useAppDispatch } from '@slices-my/store'
import { setIsAuth, setIsUserData } from '@slices-my/auth.reducer'
import { SuccessAuthType } from '@types-my/query-type'

import Index_page from '@pages/Index_page'
import Main_page from '@pages/Main_page'
import Contacts_page from '@pages/Contacts_page'
import NoAuthLayout from '@layouts/NoAuth_layout'
import AuthLayout from '@layouts/Auth_layout'
import Register_page from '@pages/Register_page'
import Login_page from '@pages/Login_page'
import Profile_page from '@pages/Profile_page'
import Logout from '@pages/Logout'

const App:FC = () => {
    const dispatch = useAppDispatch()

  const { data, isError, isLoading, refetch } = useQuery<SuccessAuthType>({
    queryKey: ['get-auth-data'],
    queryFn: AuthMethods.get_auth_data
  })

  useEffect(() => {
    if(!isLoading && !isError && data?.isAuth == true) {
      dispatch(setIsAuth(true))
      dispatch(setIsUserData(data.user))
    } else if(!isLoading && data?.isAuth === false) {
      dispatch(setIsAuth(false))
      dispatch(setIsUserData(null))
    }
  }, [data, isError, isLoading])

  useEffect(() => {
    refetch();
  }, [Cookies.get('jwt')])

  return (
    <>
   <Routes>
    <Route element={<NoAuthLayout />}>
      <Route element={<Register_page />} path="register"/>
      <Route element={<Login_page />} path='login'/>
    </Route>
    <Route element={<AuthLayout />}>
      <Route path='/' element={<Index_page />} />
      <Route path='/chats' element={<Main_page />}/>
      <Route path='/chats/:chat_id' element={<Main_page />}/>
      <Route path='/contacts' element={<Contacts_page />}/> 
      <Route path='/profile' element={<Profile_page />}/>
      <Route path='/logout' element={<Logout />}/>
    </Route>
   </Routes>
    </>
  )
}

export default App
