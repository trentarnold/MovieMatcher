import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface roomNameState {
  value: string;
}

const initialState: roomNameState = {
  value: "",
};


export const roomNameSlice = createSlice({
  name: 'roomName',
  initialState,
  reducers: {
    setRoomName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearRoomName: (state) => {
      state.value = "";
    }
  } 
});

export const { setRoomName, clearRoomName } = roomNameSlice.actions;
export const selectRoomName = (state: RootState) => state.roomName.value;
export default roomNameSlice.reducer;
