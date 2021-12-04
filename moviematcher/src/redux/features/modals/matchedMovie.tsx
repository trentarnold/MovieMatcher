import {  createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CreateAccountState {
  value: boolean;
}
const initialState: CreateAccountState = {
  value: false,
};


export const createAccountSlice = createSlice({
  name: 'createAccount',
  initialState,
  reducers: {
    turnOnCreateAccount: (state) => {
      state.value = true;
    },
    turnOffCreateAccount: (state) => {
      state.value = false
    }
  } 
});

export const { turnOnCreateAccount, turnOffCreateAccount } = createAccountSlice.actions;
export const selectCreateAccount = (state: RootState) => state.createAccount.value;
export default createAccountSlice.reducer;