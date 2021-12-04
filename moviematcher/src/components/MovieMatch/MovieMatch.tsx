import React, {useEffect, useState} from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/app/hooks';
import { selectSocketRef } from '../../redux/features/socket/socketRefSlice';
import { Movie } from '../../../../interfaces/MovieInterface';
import { useParams } from 'react-router';
import { Button } from '@chakra-ui/button';
import { moviePlaceholder } from '../../moviePlaceholder';
import './MovieMatch.css'
import MovieRatingDetails from './MovieRatingDetails/MovieRatingDetails';
import MovieThumb from '../movie-list/movie-thumb/movie-thumb';
import { FaThumbsUp, FaThumbsDown} from 'react-icons/fa';
import { turnOnMovieFilter } from '../../redux/features/modals/movieFilterSlice';
const MovieMatch = () => {
  const { room } = useParams()
  const socket = useAppSelector(selectSocketRef);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie>(moviePlaceholder);
  const [acceptedMovies, setAcceptedMovie] = useState<Movie[]>([])
  const [titles, setTitles] = useState<string[]>([]);
  const dispatch = useAppDispatch()


  useEffect(()=>{
    socket.emit('join', room);
    dispatch(turnOnMovieFilter())
    socket.on('movies', ((movies: Movie[]) => {
      setMovies(movies)
      setCurrentMovie(movies[0])
    }))
    socket.on('acceptMovie', (movie:Movie)=>{
      setAcceptedMovie([...acceptedMovies, movie]);
      setTitles((titles) => [...titles, movie.title]);
    })
    socket.on('foundMutualMovie', (room:string, movie:Movie) => {
      alert(`Match on ${movie.title}`)
    })
  }, [])

  const handleDeny = () => {
    const newList = movies;
    newList.shift();
    if (newList) {
      setMovies(newList);
      setCurrentMovie(newList[0]);
    }
  }
  
  //acceptedMovies.filter(movie => movie.title === currentMovie.title).length > 0

  const handleAccept = () => {
    if (acceptedMovies.filter(movie => movie.title === currentMovie.title).length > 0) {
      socket.emit('foundMutualMovie', room, currentMovie)
    } else {
      socket.emit('acceptMovie', room, currentMovie)
      const newList = movies;
      newList.shift();
      if (newList) {
        setMovies(newList);
        setCurrentMovie(newList[0]);
      }
    }
  }

  return (
    <div className="movie-match-container">
      {currentMovie && 
      <div>
        <div className="accepted-movie-array">
          <h1>Accepted Movies</h1>
          {acceptedMovies.length &&
          acceptedMovies.map(movie => <MovieThumb movie={movie}/>)
          }
        </div>

          <MovieRatingDetails currentMovie = {currentMovie}/>
    
        <div className="movie-match-buttons">
          <Button style ={{backgroundColor:'transparent', marginTop:'20px', height:'fit-content', width:'fit-content'}} className='enlarge-on-hover' onClick={handleAccept}><FaThumbsUp color='green' size='4em' /></Button>
          <Button style ={{backgroundColor:'transparent', marginTop:'20px', height:'fit-content', width:'fit-content'}} className='enlarge-on-hover'  onClick={handleDeny}><FaThumbsDown color='red' size='4em'  /></Button>
        </div>
      </div>}
    </div>
  )
}

export default MovieMatch
