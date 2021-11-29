import React from 'react'
import './movie-thumb.css'
import { Movie } from '../../../../../interfaces/MovieInterface'
import {Button} from '@chakra-ui/react'
import StarRatings from 'react-star-ratings';
import {  useNavigate } from "react-router-dom";
type Props = {
  movie:Movie;
}
const MovieThumb:React.FC<Props> = ({movie}) => {
  const navigate = useNavigate();

  const reduceToFiveStarRating = (averageVote:number):number => {
    return (averageVote / 2);
  }


    return (
        <div className="movie-thumb">
            <div className='movie-thumb-img-background'>
              <p> {movie.title}</p>
              <StarRatings
                  rating={reduceToFiveStarRating(movie.vote_average)}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor='gold' />
              <Button style={{backgroundColor:'transparent'}}
                     className='btn hidden-background'
                     onClick={() => {
                      navigate(`/movieDetails/${movie.id}`)
                     }}>
                     More Details
              </Button>
            </div>  
            <img className='movie-thumb-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie poster' />   
        </div>
    )
}

export default MovieThumb
