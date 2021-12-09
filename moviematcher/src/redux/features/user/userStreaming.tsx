import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface userStreamingState {
  value: number[];
}

const initialState: userStreamingState = {
  value: [],
};

export const userStreamingSlice = createSlice({
  name: 'userStreaming',
  initialState,
  reducers: {
    setUserStreaming: (state, action: PayloadAction<number[] | null>) => {
      state.value = action.payload ? action.payload : [];
    },
    addUserStreaming: (state, action: PayloadAction<number>) => {
      state.value = [...state.value, action.payload];
    },
    removeUserStreaming: (state, action: PayloadAction<number>) => {
      const index = state.value.indexOf(action.payload);
      const slice = state.value.slice();
      slice.splice(index, 1);
      state.value = slice;
    }
  } 
});

export const { setUserStreaming, addUserStreaming, removeUserStreaming } = userStreamingSlice.actions;
export const selectUserStreaming = (state: RootState) => state.userStreaming.value;
export default userStreamingSlice.reducer;