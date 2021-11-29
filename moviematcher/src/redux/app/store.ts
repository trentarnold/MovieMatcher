import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/refernces/counter/counterSlice';
import loginReducer from '../features/modals/loginSlice'
import createAccountReducer from '../features/modals/createAccountSlice'
import friendsListReducer from '../features/modals/friendsListSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    createAccount: createAccountReducer,
    friendsList: friendsListReducer,
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
