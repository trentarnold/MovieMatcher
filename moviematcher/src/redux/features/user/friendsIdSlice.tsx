import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface friendIdsState {
  value: number[];
}
const initialState: friendIdsState = {
  value: [NaN],
};


export const friendIdsSlice = createSlice({
  name: 'friendIds',
  initialState,
  reducers: {
    setFriendIds: (state, action: PayloadAction<number[]>) => {
      state.value = action.payload;
    },
    clearFriendId: (state) => {
      state.value = [NaN];
    },
    addFriendId: (state, action:PayloadAction<number>) => {
      state.value = [...state.value, action.payload];
    },
    removeFriendId: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(id => id !== action.payload)
    }
  } 
});

export const { setFriendIds, clearFriendId, addFriendId, removeFriendId } = friendIdsSlice.actions;
export const selectFriendIds = (state: RootState) => state.friendIds.value;
export default friendIdsSlice.reducer;