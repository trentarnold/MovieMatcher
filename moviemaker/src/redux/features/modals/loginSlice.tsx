import {  createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
export interface LoginState {
  value: boolean;
}
const initialState: LoginState = {
  value: false,
};


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    turnOnLogin: (state) => {
      state.value = true;
    },
    turnOffLogin: (state) => {
      state.value = false
    }
  } 
});

export const { turnOnLogin, turnOffLogin } = loginSlice.actions;
export const selectLogin = (state: RootState) => state.login.value;
export default loginSlice.reducer;



