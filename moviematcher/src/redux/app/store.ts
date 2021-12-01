import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/refernces/counter/counterSlice';
import loginReducer from '../features/modals/loginSlice'
import createAccountReducer from '../features/modals/createAccountSlice'
import friendsListReducer from '../features/modals/friendsListSlice'
import authReducer from '../features/modals/authSlice'
import userIdReducer from '../features/user/userIdSlice'
import friendIdsReducer from '../features/user/friendsIdSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    createAccount: createAccountReducer,
    friendsList: friendsListReducer,
    auth: authReducer,
    userId: userIdReducer,
    friendIds: friendIdsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
