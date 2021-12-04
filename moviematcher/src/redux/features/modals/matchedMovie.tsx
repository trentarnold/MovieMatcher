import {  createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MatchedMovieState {
  value: boolean;
}
const initialState: MatchedMovieState = {
  value: false,
};


export const matchedMovieSlice = createSlice({
  name: 'matchedMovie',
  initialState,
  reducers: {
    turnOnMatchedMovie: (state) => {
      state.value = true;
    },
    turnOffMatchedMovie: (state) => {
      state.value = false
    }
  } 
});

export const { turnOnMatchedMovie, turnOffMatchedMovie } = matchedMovieSlice.actions;
export const selectMatchedMovie = (state: RootState) => state.matchedMovie.value;
export default matchedMovieSlice.reducer;