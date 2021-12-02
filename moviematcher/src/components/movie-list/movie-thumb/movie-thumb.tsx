import React from 'react'
import './movie-thumb.css'
import { Movie } from '../../../../../interfaces/MovieInterface'
import {Button} from '@chakra-ui/react'
import StarRatings from 'react-star-ratings';
import {  useNavigate } from "react-router-dom";
import { FaPlus, FaMinus} from 'react-icons/fa';
import { ServerApiService } from '../../../services/ServerApi';
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { selectFavoriteMovieIds, setFavoriteMovieIds } from '../../../redux/features/user/watchListIds'

type Props = {
  movie:Movie;
}
const MovieThumb:React.FC<Props> = ({movie}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuth);
  const favoriteMovieIds = useAppSelector(selectFavoriteMovieIds);
  const reduceToFiveStarRating = (averageVote:number):number => {
    return (averageVote / 2);
  }
  const handleAddToWatchList = async() => {
    let watchList;
    if(favoriteMovieIds.includes(movie.id)){
       watchList = await ServerApiService.deleteFromWatchList(accessToken, movie.id);
    }else {
       watchList = await ServerApiService.addToWatchList(accessToken, movie.id);
    }
    let ids = watchList.map((movie) => movie.movieid)
    dispatch(setFavoriteMovieIds(ids));
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
                     className='btn hidden-background enlarge-on-hover'
                     onClick={() => {
                      navigate(`/movieDetails/${movie.id}`)
                     }}>
                     More Details
              </Button>
              <Button style={{backgroundColor:'transparent'}}
                      className='enlarge-on-hover'
                      onClick={handleAddToWatchList}
                      >
                    {favoriteMovieIds.includes(movie.id) ? <FaMinus color='red' /> : <FaPlus color='green'/>}
                     <span style={{fontStyle:'italic'}}>{favoriteMovieIds.includes(movie.id) ? 'Remove WatchList' :'Add to WatchList' } </span>
              </Button>
              <Button style={{backgroundColor:'transparent'}}
                      className='enlarge-on-hover'>
                    <FaMinus color='red'/> <span style={{fontStyle:'italic'}}>Add to BlackList</span>
              </Button>
            </div>  
            <img className='movie-thumb-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie poster' />   
        </div>
    )
}

export default MovieThumb
