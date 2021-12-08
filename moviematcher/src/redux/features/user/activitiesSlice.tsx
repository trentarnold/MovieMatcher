import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { activityInterface } from '../../../../../interfaces/activityInterface';

export interface activitiesState {
  value: activityInterface[];
}
const initialState: activitiesState = {
  value: [],
};


export const activitiesSlice = createSlice({
  name: 'friendIds',
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<activityInterface[]>) => {
      state.value = action.payload;
    },
    clearActivities: (state) => {
      state.value = [];
    },
  } 
});

export const { setActivities, clearActivities } = activitiesSlice.actions;
export const selectActivities = (state: RootState) => state.activities.value;
export default activitiesSlice.reducer;