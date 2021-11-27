import React from 'react'
import './movie-thumb.css'
import { Movie } from '../../../../../interfaces/MovieInterface'
import {Button} from '@chakra-ui/react'
type Props = {
  movie:Movie;
}
const MovieThumb:React.FC<Props> = ({movie}) => {
    return (
        <div className="movie-thumb">
            <div className='movie-thumb-img-background'>
              <p> {movie.title}</p>
              <p> {movie.vote_average}</p>
              <Button style={{backgroundColor:'transparent'}} className='btn hidden-background'>More Details</Button>
            </div>  
            <img className='movie-thumb-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie poster' />   
        </div>
    )
}

export default MovieThumb
