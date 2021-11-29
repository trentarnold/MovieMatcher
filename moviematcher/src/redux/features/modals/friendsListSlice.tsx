import {  createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FriendsListState {
  value: boolean;
}
const initialState: FriendsListState = {
  value: false,
};


export const friendsListSlice = createSlice({
  name: 'friendsList',
  initialState,
  reducers: {
    toggleFriendsList: (state) => {
      state.value = !state.value;
    },
  } 
});

export const { toggleFriendsList} = friendsListSlice.actions;
export const selectFriendsList = (state: RootState) => state.friendsList.value;
export default friendsListSlice.reducer;
