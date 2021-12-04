import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface ratingInterface {
  movieid: number,
  rating: number
}

export interface ratingsState {
  value: ratingInterface[];
}

const initialState: ratingsState = {
  value: []
};

export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRatings: (state, action: PayloadAction<ratingInterface[]>) => {
      state.value = action.payload;
    },
    clearRatings: (state) => {
      state.value = [];
    },
    addRating: (state, action:PayloadAction<ratingInterface>) => {
      state.value = [...state.value, action.payload];
    },
    removeRating: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.movieid !== action.payload)
    }
  } 
});

export const { setRatings, clearRatings, addRating, removeRating } = ratingsSlice.actions;
export const selectRatings = (state: RootState) => state.ratings.value;
export default ratingsSlice.reducer;