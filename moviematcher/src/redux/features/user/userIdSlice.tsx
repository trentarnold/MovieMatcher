import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface userIdState {
  value: number;
}
const initialState: userIdState = {
  value: NaN,
};


export const userIdSlice = createSlice({
  name: 'userId',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    clearUserId: (state) => {
      state.value = NaN;
    }
  } 
});

export const { setUserId, clearUserId } = userIdSlice.actions;
export const selectAuth = (state: RootState) => state.userId.value;
export default userIdSlice.reducer;