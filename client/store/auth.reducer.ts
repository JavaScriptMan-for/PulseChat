import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateType } from '../types/redux-type';
import { JwtUserType } from '@types-my/query-type';

    const initialState: AuthStateType = {
        isAuth: false,
        auth_data: null
    };

  const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth (state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setIsUserData (state, action: PayloadAction<JwtUserType | null>) {
            state.auth_data = action.payload
        }
    },
     });

export const { setIsAuth, setIsUserData } = auth.actions;

export default auth.reducer;