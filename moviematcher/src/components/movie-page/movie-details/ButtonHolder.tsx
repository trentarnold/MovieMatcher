import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@chakra-ui/button';
import { MovieDetailsInterface } from '../../../../../interfaces/MovieDetails';
import {useAppDispatch, useAppSelector} from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { selectFavoriteMovieIds, setFavoriteMovieIds, removeFavoriteMovieIds } from '../../../redux/features/user/watchListIds';
import { selectBlackListIds, removeBlackListIds, setBlackListIds } from '../../../redux/features/user/blackListids';
import { ServerApiService } from '../../../services/ServerApi';
import { FaPlus, FaMinus, FaTimes, FaSkull} from 'react-icons/fa';
import { selectRatings, removeRating } from '../../../redux/features/user/ratingsSlice';
import StarRatings from 'react-star-ratings';
import { setActivities } from '../../../redux/features/user/activitiesSlice';
require('./ButtonHolder.css');
type Props = {
  movie:MovieDetailsInterface,
  setRatingModalToggle?:any,
  setNewRating?: any,
  flexColumn?: boolean,
}
const ButtonHolder: React.FC<any>  = ({movie, setRatingModalToggle, setWatchedMovies, watchedMovies, flexColumn }) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuth);
  const favoriteMovieIds = useAppSelector(selectFavoriteMovieIds);
  const blackListIds = useAppSelector(selectBlackListIds);
  const userRatings = useAppSelector(selectRatings);
  const [watchedMovieToggle, setWatchedMovieToggle] = useState<boolean>(false);
  const [watchedMovieDateToggle, setWatchedMovieDateToggle] = useState<boolean>(false);
  const [watchDate, setWatchDate] = useState<Date>(new Date(Date.now()))
  const handleAddToWatchList = async() => {
    let watchList;
    if(favoriteMovieIds.includes(movie.id)){
       watchList = await ServerApiService.deleteFromWatchList(accessToken, movie.id);
    }else {
      if(blackListIds.includes(movie.id)) {
        dispatch(removeBlackListIds(movie.id))
      }
       watchList = await ServerApiService.addToWatchList(accessToken, movie.id);
    }
    let ids = watchList.map((movie) => movie.movieid)
    const activities = await ServerApiService.getActivities(accessToken);
    dispatch(setActivities(activities));
    dispatch(setFavoriteMovieIds(ids));
  }
  const handleBlackList = async() => {
    let blackList;
    if(blackListIds.includes(movie.id)){
      blackList = await ServerApiService.deleteFromBlackList(accessToken, movie.id);
    }else {
      if(favoriteMovieIds.includes(movie.id)) {
        dispatch(removeFavoriteMovieIds(movie.id))
      }
      blackList = await ServerApiService.addToBlackList(accessToken, movie.id);
    }
    let ids = blackList.map((movie) => movie.movieid)
    const activities = await ServerApiService.getActivities(accessToken);
    dispatch(setActivities(activities));
    dispatch(setBlackListIds(ids));
  }
  const checkRatings = () => {
    let currMovieRating;
    userRatings.map((item: {rating: Number, movieid: number}) => {
      if (item.movieid === movie.id) currMovieRating = item.rating;
      return item.rating;
    })
    return currMovieRating;
  }
  const handleDeleteRating = async () => {
    ServerApiService.removeRating(accessToken, movie.id)
    const activities = await ServerApiService.getActivities(accessToken);
    dispatch(setActivities(activities));
    dispatch(removeRating(movie.id));
  }
  const updateWatchDate = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWatchDate(new Date(e.target.value))
  }
  const updateWatchedMovie = async () => {
    console.log(watchDate)
    const newestMovie = await ServerApiService.addWatchedMovie(accessToken, {movieID: movie.id, createdDate: watchDate});
    setWatchedMovieToggle(false)
    setWatchedMovieDateToggle(false)
    setWatchedMovies([...watchedMovies, newestMovie]);
    setWatchDate(new Date(Date.now()))
  }
  return (
    <div className={`movie-details-button-holder ${flexColumn ? 'column': ''}`} style={{margin: "1.5rem 0"}}>
      <Button 
        style={{backgroundColor:'transparent'}}
        className='enlarge-on-hover'
        onClick={handleAddToWatchList}
      >
        {favoriteMovieIds.includes(movie.id) ? <FaTimes color='red' /> : <FaPlus color='green'/>}
        <span style={{fontStyle:'italic'}}>{favoriteMovieIds.includes(movie.id) ? 'Remove Wantlist' :'Want to Watch' } </span>
      </Button>
      <Button
        style={{backgroundColor:'transparent'}}
        className='enlarge-on-hover'
        onClick={handleBlackList}>
        { blackListIds.includes(movie.id) ? <FaMinus color='red'/> : <FaSkull color='red' /> }
        <span style={{fontStyle:'italic'}}>{blackListIds.includes(movie.id) ? 'Remove Blacklist' : 'Blacklist It'}</span>
      </Button>
      {checkRatings() 
        ? <Button style={{backgroundColor:'transparent'}} title="click to delete rating" className="enlarge-on-hover" onClick={handleDeleteRating}>
          You rated: 
          <StarRatings 
            rating={checkRatings()}
            starDimension="1.25rem"
            starSpacing="1px"
            starRatedColor='gold'
          />
          </Button> 
        : <Button style={{backgroundColor:'transparent'}} onClick={() => setRatingModalToggle(true)}>Rate</Button>
      }

     { flexColumn ? <></> :  watchedMovieToggle 
      ? watchedMovieDateToggle
        ? <div className="date-form" style={{display: "flex"}}>
          <input className='enlarge-on-hover' type="datetime-local" onChange={(e) => updateWatchDate(e)}></input>
          <Button type="submit" style={{backgroundColor:'transparent', marginLeft: "0.5rem"}} className='enlarge-on-hover' onClick={updateWatchedMovie}>Save</Button>
        </div>
        : <div style={{display: "flex"}}>
          <Button style={{backgroundColor:'transparent'}} className='enlarge-on-hover' onClick={updateWatchedMovie}>Today</Button>
          <Button style={{backgroundColor:'transparent'}} className='enlarge-on-hover' onClick={() => setWatchedMovieDateToggle(true)}>Other</Button>
        </div>
      : <Button style={{backgroundColor:'transparent'}} className='enlarge-on-hover' onClick={() => setWatchedMovieToggle(true)}>Watched It</Button>
      }
    </div>
  )
}

export default ButtonHolder
