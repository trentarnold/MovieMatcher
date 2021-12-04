import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/refernces/counter/counterSlice';
import loginReducer from '../features/modals/loginSlice'
import createAccountReducer from '../features/modals/createAccountSlice'
import friendsListReducer from '../features/modals/friendsListSlice'
import authReducer from '../features/modals/authSlice'
import userIdReducer from '../features/user/userIdSlice'
import friendIdsReducer from '../features/user/friendsIdSlice'
import  favoriteMovieIdsReducer  from '../features/user/watchListIds';
import blackListIdsReducer from '../features/user/blackListids';
import loggedInUsersReducer from '../features/user/loggedInUsers';
import socketRefReducer from '../features/socket/socketRefSlice';
import ratingsReducer from '../features/user/ratingsSlice'
import movieFilterReducer from '../features/modals/movieFilterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    createAccount: createAccountReducer,
    friendsList: friendsListReducer,
    auth: authReducer,
    userId: userIdReducer,
    friendIds: friendIdsReducer,
    favoriteMovieIds: favoriteMovieIdsReducer,
    blackListIds: blackListIdsReducer,
    loggedInUser: loggedInUsersReducer,
    socketRef: socketRefReducer,
    ratings: ratingsReducer,
    movieFilter: movieFilterReducer,
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
