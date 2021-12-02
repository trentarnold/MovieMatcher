import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface favoriteMovieIdsState {
  value: number[];
}
const initialState: favoriteMovieIdsState = {
  value: [NaN],
};


export const favoriteMovieIdsSlice = createSlice({
  name: 'favoriteMovieIds',
  initialState,
  reducers: {
    setFavoriteMovieIds: (state, action: PayloadAction<number[]>) => {
      state.value = action.payload;
    },
    clearFavoriteMovieIds: (state) => {
      state.value = [NaN];
    },
    addFavoriteMovieIds: (state, action:PayloadAction<number>) => {
      state.value = [...state.value, action.payload];
    },
    removeFavoriteFriendIds: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(id => id !== action.payload)
    }
  } 
});

export const { setFavoriteMovieIds, clearFavoriteMovieIds, addFavoriteMovieIds, removeFavoriteFriendIds } = favoriteMovieIdsSlice.actions;
export const selectFavoriteMovieIds = (state: RootState) => state.favoriteMovieIds.value;
export default favoriteMovieIdsSlice.reducer;