import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'
import loginReducer, { LoginState } from './redux/features/modals/loginSlice'
import createAccountReducer, { CreateAccountState } from './redux/features/modals/createAccountSlice'
import friendsListReducer, { FriendsListState } from './redux/features/modals/friendsListSlice'
import authReducer, {authState} from './redux/features/modals/authSlice'
import userIdReducer, {userIdState} from './redux/features/user/userIdSlice'
import friendIdReducer, {friendIdsState} from './redux/features/user/friendsIdSlice'
import favoriteMovieIdsReducer, {favoriteMovieIdsState} from './redux/features/user/watchListIds';
import blackListIdsReducer, {blackListIdsState} from './redux/features/user/blackListids';
import loggedInUserReducer, {loggedInUserState} from './redux/features/user/loggedInUsers'
import socketRefReducer, {socketRefState} from './redux/features/socket/socketRefSlice'
import ratingsReducer, { ratingsState } from './redux/features/user/ratingsSlice';
import movieFilterReducer, {MovieFilterState} from './redux/features/modals/movieFilterSlice'
import matchedMovieReducer, {MatchedMovieState} from './redux/features/modals/matchedMovie'
import activitiesReducer, { activitiesState } from './redux/features/user/activitiesSlice';
import userNameReducer, { UserNameState} from './redux/features/user/yourUserName';
import activityListModalReducer, {ActivityListModalState} from './redux/features/modals/activityListModal'
import  roomNameReducer, {roomNameState}  from './redux/features/modals/roomNameSlice';
import userStreamingReducer, {userStreamingState} from './redux/features/user/userStreaming';
import { SocketContext, socket } from './socket';

const persistConfig = {
  key: 'root',
  storage,
};

interface IAppState {
  login: LoginState;
  createAccount: CreateAccountState;
  friendsList: FriendsListState;
  auth: authState; 
  userId: userIdState;
  friendIds: friendIdsState;
  favoriteMovieIds: favoriteMovieIdsState;
  blackListIds: blackListIdsState;
  loggedInUser: loggedInUserState;
  socketRef: socketRefState;
  ratings: ratingsState;
  movieFilter: MovieFilterState;
  activities: activitiesState;
  matchedMovie: MatchedMovieState;
  userName: UserNameState;
  activityListModal: ActivityListModalState;
  roomName: roomNameState;
  userStreaming: userStreamingState;
}

const rootReducer = combineReducers<IAppState>({
  login: loginReducer,
  createAccount: createAccountReducer,
  friendsList: friendsListReducer,
  auth: authReducer,
  userId: userIdReducer,
  friendIds: friendIdReducer,
  favoriteMovieIds: favoriteMovieIdsReducer,
  blackListIds: blackListIdsReducer,
  loggedInUser: loggedInUserReducer,
  socketRef: socketRefReducer,
  ratings: ratingsReducer,
  movieFilter: movieFilterReducer,
  activities: activitiesReducer,
  matchedMovie: matchedMovieReducer,
  userName: userNameReducer,
  activityListModal: activityListModalReducer,
  roomName: roomNameReducer,
  userStreaming: userStreamingReducer,
});

const persisted = persistReducer(persistConfig, rootReducer);
const persistStorage = createStore(persisted);
const persistor = persistStore(persistStorage);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={persistStorage}>
    <SocketContext.Provider value={socket}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <BrowserRouter >
              <App />
            </BrowserRouter>
          </ChakraProvider>
        </PersistGate>
      </SocketContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
