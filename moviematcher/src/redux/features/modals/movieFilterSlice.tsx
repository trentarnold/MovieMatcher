import {  createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MovieFilterState {
  value: boolean;
}
const initialState: MovieFilterState = {
  value: false,
};


export const movieFilterSlice = createSlice({
  name: 'movieFilter',
  initialState,
  reducers: {
    turnOnMovieFilter: (state) => {
      state.value = true;
    },
    turnOffMovieFilter: (state) => {
      state.value = false
    }
  } 
});

export const { turnOnMovieFilter, turnOffMovieFilter } = movieFilterSlice.actions;
export const selectMovieFilter = (state: RootState) => state.movieFilter.value;
export default movieFilterSlice.reducer;
