import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IActivity } from '../../../../../interfaces/activityInterface';

export interface activitiesState {
  value: IActivity[];
}
const initialState: activitiesState = {
  value: [],
};


export const activitiesSlice = createSlice({
  name: 'friendIds',
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<IActivity[]>) => {
      state.value = action.payload;
    },
    clearActivities: (state) => {
      state.value = [];
    }
  } 
});

export const { setActivities, clearActivities } = activitiesSlice.actions;
export const selectActivities = (state: RootState) => state.activities.value;
export default activitiesSlice.reducer;