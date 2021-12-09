import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface loggedInUserState {
  value: string[];
}

const initialState: loggedInUserState = {
  value: [''],
};

export const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  } 
});

export const { setLoggedInUser } = loggedInUserSlice.actions;
export const selectLoggedInUser = (state: RootState) => state.loggedInUser.value;
export default loggedInUserSlice.reducer;