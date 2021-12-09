import {  createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ActivityListModalState {
  value: boolean;
}

const initialState: ActivityListModalState = {
  value: false,
};

export const activityListModalSlice = createSlice({
  name: 'activityListModal',
  initialState,
  reducers: {
    turnOnActivityListModal: (state) => {
      state.value = true;
    },
    turnOffActivityListModal: (state) => {
      state.value = false
    }
  } 
});

export const { turnOnActivityListModal, turnOffActivityListModal } = activityListModalSlice.actions;
export const selectActivityListModal = (state: RootState) => state.activityListModal.value;
export default activityListModalSlice.reducer;