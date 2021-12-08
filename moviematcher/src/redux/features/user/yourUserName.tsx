import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserNameState {
  value: string;
}

const initialState: UserNameState = {
  value: '',
};

export const userNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetUserName: (state) => {
      state.value = ''
    }
  } 
});

export const { setUserName, resetUserName } = userNameSlice.actions;
export const selectUserName = (state: RootState) => state.userName.value;
export default userNameSlice.reducer;