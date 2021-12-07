import './App.css';
import FriendsList from './components/friends-list/friends-list';
import Navbar from './components/nav-bar/Nav-bar';
import Home from './components/home/home';
import RecentActivity from './components/recent-activity/recent-activity';
import ProfilePage from './components/profile-page/profile-page';
import MoviePage from './components/movie-page/movie-page';
import InviteToast from './components/invite-toast/invite-toast';
import {Routes, Route, Outlet} from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import CreateAccountForm from './forms/CreateAccountForm';
import { ReactText, useEffect, useRef, useState } from 'react';
import ActorPage from './components/ActorPage/ActorPage';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import { ServerApiService } from './services/ServerApi';
import { selectAuth } from './redux/features/modals/authSlice';
import { setFriendIds } from './redux/features/user/friendsIdSlice';
import { User } from '../../interfaces/responses';
import { setFavoriteMovieIds } from './redux/features/user/watchListIds';
import { setBlackListIds } from './redux/features/user/blackListids';
import io, { Socket } from 'socket.io-client';
import { setLoggedInUser} from './redux/features/user/loggedInUsers';
import { setSocketRef, selectSocketRef } from './redux/features/socket/socketRefSlice';
import { useNavigate } from 'react-router-dom';
import  MovieMatch  from './components/MovieMatch/MovieMatch'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setRatings } from './redux/features/user/ratingsSlice';
import { selectMovieFilter, turnOnMovieFilter } from './redux/features/modals/movieFilterSlice';
import FilterForm from './forms/filterForm';
import { setActivities } from './redux/features/user/activitiesSlice';
import { setUserName } from './redux/features/user/yourUserName';
import {socket} from './socket'
import {filterData} from '../../interfaces/filterFormInterface';
import { setUserStreaming } from './redux/features/user/userStreaming';

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const toastRef = useRef<ReactText>('');
  interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    message: () => void;
    loggedInUsers: (loggedInUsers:string[]) => void;
    invite: (room:string, otherUserName:string, username:string) => void;
    accepted: (room:string) => void;
    denied: (room:string) => void;
    applyFilter: (room:string, filters:{}) => void;
  }
  interface ClientToServerEvents {
    login: (username:string) => void;
    accepted: (room:string) => void;
  }
  

  useEffect(() => {
    document.title = "Movie Matcher"

    if(accessToken) {
      const getYourUserInfo = async() => {
        let yourUserInfo =  await ServerApiService.getUser(accessToken);
        socket.emit('login',  yourUserInfo.username);
        socket.on('loggedInUsers', (loggedInUsers:string[]) => {
          dispatch(setLoggedInUser(loggedInUsers));
        })
        socket.on('invite', (room:string, otherUserName:string, username ) => {
          const openToast = () => toastRef.current = toast(<InviteToast room={room} toastRef = {toastRef.current} otherUserName={username}/>)
            openToast();
        })
        socket.on('denied', (room:string) => {
          toast('You got denied bitch')
        })
        socket.on('accepted', (room:string) => {
          navigate(`/movieMatch/${room}`)
        })
        dispatch(setSocketRef(socket))
      }
      getYourUserInfo()
    }
  }, [accessToken]);


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
    const fetchRatings = async() => {
      let ratingsFull = await ServerApiService.getUserRatings(accessToken);
      let ratings = ratingsFull.map(rating => {
        return {rating: rating.rating, movieid: rating.movieid}
      })
      dispatch(setRatings(ratings))
    }
    const fetchActivities = async() => {
      let activities = await ServerApiService.getActivities(accessToken);
      dispatch(setActivities(activities));
    }
    async function getUsername () {
      const info = await ServerApiService.getUser(accessToken);
      dispatch(setUserName(info.username));
      dispatch(setUserStreaming(info.streaming));
    }
    if(accessToken) {
      fetchFriends();
      fetchFavoriteMovies();
      fetchBlackListMovies();
      fetchRatings();
      fetchActivities();
      getUsername();
    }
  }, [accessToken])
 
  return (
    <div className="App">
      <Navbar />
      <FriendsList />
      <Routes>
          <Route path='/' element={<Home /> } />
          <Route path='/recent' element={<RecentActivity />} />
          <Route path='/recent/:movieId/:otherUserName' element={<RecentActivity />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/movieDetails/:id' element={<MoviePage />} />
          <Route path='/actorDetails/:id' element = {<ActorPage />} />
          <Route path='/profile/:id' element = {<ProfilePage />} />
          <Route path ='/movieMatch/:room' element = {<MovieMatch />} />
      </Routes>
      <div className="outlet">
        <Outlet />
      </div>
      <LoginForm />
      <CreateAccountForm />
      <FilterForm />
      <ToastContainer 
        position ='top-center'
        autoClose={30000}
        closeOnClick={false}
        draggable
        pauseOnHover
        theme='dark'
         />
    </div>
  );
}

export default App;
