import './App.css';
import FriendsList from './components/friends-list/friends-list';
import Navbar from './components/nav-bar/Nav-bar';
import Home from './components/home/home';
import RecentActivity from './components/recent-activity/recent-activity';
import ProfilePage from './components/profile-page/profile-page';
import MoviePage from './components/movie-page/movie-page';
import {Routes, Route, Outlet} from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import CreateAccountForm from './forms/CreateAccountForm';
import { useEffect } from 'react';
import ActorPage from './components/ActorPage/ActorPage';
import SocketTest from './components/socket-test/socket-test';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import { ServerApiService } from './services/ServerApi';
import { selectAuth } from './redux/features/modals/authSlice';
import { setFriendIds } from './redux/features/user/friendsIdSlice';
import { User } from '../../interfaces/responses';
import { setFavoriteMovieIds } from './redux/features/user/watchListIds';
import { setBlackListIds } from './redux/features/user/blackListids'
function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuth);
  useEffect(() => {
    document.title = "Movie Matcher"
  }, []);
  useEffect(() => {
    const fetchFriends = async() => {
     let userFriends = await ServerApiService.getFriends(accessToken);
     let ids = userFriends.map((friend:User) => friend.id);
     dispatch(setFriendIds(ids));
    }
    const fetchFavoriteMovies = async() => {
      let favoriteMovies  = await ServerApiService.getWatchList(accessToken);
      let ids = favoriteMovies.map((movie) => movie.movieid)
      dispatch(setFavoriteMovieIds(ids));
    }
    const fetchBlackListMovies = async() => {
      let blackListMovies = await ServerApiService.getBlackList(accessToken);
      let ids = blackListMovies.map((movie) => movie.movieid);
      dispatch(setBlackListIds(ids));
    }
    if(accessToken) {
      fetchFriends();
      fetchFavoriteMovies();
      fetchBlackListMovies();
    }
  })
 
  return (
    <div className="App">
      <Navbar />
      <FriendsList />
      <Routes>
          <Route path='/' element={<Home /> } />
          <Route path='/recent' element={<RecentActivity />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/movieDetails/:id' element={<MoviePage />} />
          <Route path='/actorDetails/:id' element = {<ActorPage />} />
          <Route path='/profile/:id' element = {<ProfilePage />} />
          <Route path='/socket' element = {<SocketTest />} />
      </Routes>
      <div className="outlet">
        <Outlet />
      </div>
      <LoginForm />
      <CreateAccountForm />
    </div>
  );
}

export default App;
