import {useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/app/hooks';
import { selectSocketRef } from '../../redux/features/socket/socketRefSlice';
import { IMovie } from '../../../../interfaces/movieInterface';
import { useParams } from 'react-router';
import { Button } from '@chakra-ui/button';
import { moviePlaceholder } from '../../moviePlaceholder';
import './MovieMatch.css'
import MovieRatingDetails from './MovieRatingDetails/MovieRatingDetails';
import MovieThumb from '../movie-list/movie-thumb/movie-thumb';
import { FaThumbsUp, FaThumbsDown} from 'react-icons/fa';
import { turnOnMovieFilter } from '../../redux/features/modals/movieFilterSlice';
import { turnOnMatchedMovie, turnOffMatchedMovie } from '../../redux/features/modals/matchedMovie';
import MatchedMovieModal from './MatchedMovieModal/MatchedMovieModal';
import { selectUserName } from '../../redux/features/user/yourUserName';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { setRoomName } from '../../redux/features/modals/roomNameSlice';
import FilterForm from '../../forms/filterForm';
import MovieList from '../movie-list/movie-list';

const MovieMatch = () => {
  const { room } = useParams();
  const socket = useAppSelector(selectSocketRef);
  const userName = useAppSelector(selectUserName);
  const [otherUserName, setOtherUserName] = useState('');
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<IMovie>(moviePlaceholder);
  const [matchedMovie, setMatchedMovie] = useState<IMovie>(moviePlaceholder);
  const [acceptedMovies, setAcceptedMovie] = useState<IMovie[]>([]);
  const [bothAccept, setBothAccept] = useState(false);
  const [showOtherFriendAccept, setshowOtherFriendAccept] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(acceptedMovies, 'these are the accepted movies')
  useEffect(()=>{
    if (room) {dispatch(setRoomName(room));
    dispatch(turnOnMovieFilter());
    };
    socket.on('movies', ((movies: IMovie[], room:string) => {
      const users = room.split('+');
      users[0] === userName ? setOtherUserName(users[1]) : setOtherUserName(users[0]);
      setMovies(movies);
      setCurrentMovie(movies[0]);
    }));
    socket.on('acceptMovie', (movie:IMovie)=>{
      setAcceptedMovie(acceptedMovies => [...acceptedMovies, movie]);
      setTitles((titles) => [...titles, movie.title]);
    });
    socket.on('foundMutualMovie', (room:string, movie:IMovie) => {
      setMatchedMovie(movie);
      dispatch(turnOnMatchedMovie());
    });
    socket.on('declineWatchMovie', (userName:string, title:string) => {
      toast(`${userName} no longer wants to watch ${title}`);
      dispatch(turnOffMatchedMovie());
      setBothAccept(false);
    });
    socket.on('otherUserAccepted', (userName:string) => {
      setBothAccept(true);
      setshowOtherFriendAccept(true);
    });
    socket.on('bothUsersAccepted', (otherUserName:string, movieId:string, room:string) => {
      const users = room.split('+');
      users[0] === userName ? navigate(`/recent/${movieId}/${users[1]}`) : navigate(`/recent/${movieId}/${users[0]}`);
      // navigate(`/recent/${movieId}/${otherUserName}`);
      dispatch(turnOffMatchedMovie());
      setBothAccept(false);
    });
  }, []);

  const handleDeny = () => {
    const newList = movies;
    newList.shift();
    if (newList) {
      setMovies(newList);
      setCurrentMovie(newList[0]);
    };
  };
  //acceptedMovies.filter(movie => movie.title === currentMovie.title).length > 0

  const handleAccept = () => {
    if (acceptedMovies.filter(movie => movie.title === currentMovie.title).length > 0) {
      socket.emit('foundMutualMovie', room, currentMovie);
    } else {
      socket.emit('acceptMovie', room, currentMovie);
      const newList: IMovie[] = [...movies];
      newList.shift();
      if (newList) {
        setMovies(newList);
        setCurrentMovie(newList[0]);
      };
    };
  };
  const acceptWatchMovie =() => {
    if (!bothAccept) {
      socket.emit('otherUserAccepted', room, userName);
    } else {
      socket.emit('bothUsersAccepted', room, userName, matchedMovie.id);
    };
  };

  const declineWatchMovie = () => {
    dispatch(turnOffMatchedMovie());
    socket.emit('declineWatchMovie', userName, room, matchedMovie.title);
    setBothAccept(false);
  }

  return (
    <>
    <div className="movie-match-container">
      {currentMovie.overview !==  'String' &&
      <div>
        <MovieRatingDetails currentMovie = {currentMovie} handleAccept = {handleAccept} handleDeny = {handleDeny}/>
        <div className="movie-match-buttons">
          <Button
          _focus ={{
            boxShadow:
            ""}}
           style ={{backgroundColor:'transparent', marginTop:'20px', height:'fit-content', width:'fit-content'}} className='enlarge-on-hover' onClick={handleAccept}>
            <div className='movie-rating-button'>
              <FaThumbsUp color='green' size='4em' />
              <span className='movie-rating-button-span'>I'll Watch it</span>
            </div>
          </Button>
          <Button
            _focus ={{
              boxShadow:
              ""}}
           style ={{backgroundColor:'transparent', marginTop:'20px', height:'fit-content', width:'fit-content'}} className='enlarge-on-hover'  onClick={handleDeny}>
          <div className='movie-rating-button'>
            <FaThumbsDown color='red' size='4em'  />
            <span className='movie-rating-button-span'>Not a chance</span>
          </div>
          </Button>
        </div>
      </div>}

      <MatchedMovieModal  currentMovie = {matchedMovie} otherUserName = {otherUserName} showOtherFriendAccept = {showOtherFriendAccept}
                          declineWatchMovie = {declineWatchMovie} acceptWatchMovie = {acceptWatchMovie}/>
      <FilterForm />
    </div>
    {acceptedMovies.length && <MovieList criteria='Accepted Movies:' movieList = {acceptedMovies} />}
    </>
  )
}

export default MovieMatch
