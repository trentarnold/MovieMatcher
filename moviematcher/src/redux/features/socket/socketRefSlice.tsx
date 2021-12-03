import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface socketRefState {
  value: any;
}
const initialState: socketRefState = {
  value: {},
};


export const socketRefSlice = createSlice({
  name: 'socketRef',
  initialState,
  reducers: {
    setSocketRef: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    clearSocketRef: (state) => {
      state.value = {};
    },
  } 
});

export const { setSocketRef, clearSocketRef } = socketRefSlice.actions;
export const selectSocketRef = (state: RootState) => state.socketRef.value;
export default socketRefSlice.reducer;