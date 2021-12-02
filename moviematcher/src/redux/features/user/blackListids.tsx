import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface blackListIdsState {
  value: number[];
}
const initialState: blackListIdsState = {
  value: [NaN],
};


export const blackListIdsSlice = createSlice({
  name: 'blackListIds',
  initialState,
  reducers: {
    setBlackListIds: (state, action: PayloadAction<number[]>) => {
      state.value = action.payload;
    },
    clearBlackListIds: (state) => {
      state.value = [NaN];
    },
    addBlackListIds: (state, action:PayloadAction<number>) => {
      state.value = [...state.value, action.payload];
    },
    removeBlackListIds: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(id => id !== action.payload)
    }
  } 
});

export const { setBlackListIds, clearBlackListIds, addBlackListIds, removeBlackListIds } = blackListIdsSlice.actions;
export const selectBlackListIds = (state: RootState) => state.blackListIds.value;
export default blackListIdsSlice.reducer;