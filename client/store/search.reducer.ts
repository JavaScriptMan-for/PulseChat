import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchStateType } from '@types-my/redux-type';

    const initialState: SearchStateType  = {
        query: ""
    };

  const search = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery (state, actions: PayloadAction<string>) {
            state.query = actions.payload
        }
    },
     });

export const { setQuery } = search.actions;

export default search.reducer;