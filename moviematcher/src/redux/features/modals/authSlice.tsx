import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface authState {
  value: string;
}
const initialState: authState = {
  value: "",
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearToken: (state) => {
      state.value = "";
    }
  } 
});

export const { setToken, clearToken } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.value;
export default authSlice.reducer;



