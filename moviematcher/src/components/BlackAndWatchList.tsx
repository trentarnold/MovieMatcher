import React, {useState, useEffect} from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { selectFavoriteMovieIds } from '../redux/features/user/watchListIds';
import { selectBlackListIds } from '../redux/features/user/blackListids';
import { MovieDetailsInterface } from '../../../interfaces/MovieDetails';
import  APIService  from '../services/APISevice';
import FavoriteMovieList from './FavoriteMovieList'
import { useParams } from 'react-router';
import { ServerApiService } from '../services/ServerApi';
import { selectAuth } from '../redux/features/modals/authSlice';
const BlackAndWatchList = () => {
  const favoriteMovieIds = useAppSelector(selectFavoriteMovieIds);
  const blackListIds = useAppSelector(selectBlackListIds);
  const accessToken = useAppSelector(selectAuth);
  const [watchListMovies, setWatchListMovies] = useState<MovieDetailsInterface[]>([]);
  const [blackListedMovies, setBlackListedMovies] = useState<MovieDetailsInterface[]>([]);
  const { id } : any = useParams();
  useEffect(() => {
    if(id) return
    let isCancelled = false;
    const getFavoriteMovies = async() => {
       let favoriteMovies = await Promise.all(favoriteMovieIds.map(async(id) => {
            return await APIService.getIndividualMovie(id.toString())
        }))
        if(!isCancelled) {
            setWatchListMovies(favoriteMovies);
        }
    }
    getFavoriteMovies();
    
    return () => {
        isCancelled = true;
    }

}, [favoriteMovieIds, id])

useEffect(() => {
  if(id) return
  let isCancelled = false;
  const getBlackListedMovies = async() => {
     let blackListedMovies = await Promise.all(blackListIds.map(async(id) => {
          return await APIService.getIndividualMovie(id.toString())
      }))
      if(!isCancelled) {
          setBlackListedMovies(blackListedMovies);
      }
  }
  getBlackListedMovies();
  
  return () => {
      isCancelled = true;
  }

}, [blackListIds, id])

useEffect(() => {
  if(!id) return
  let isCancelled = false;
  const getOtherUserFavMovies = async() => {
    const otherUserFavoriteMovies = await ServerApiService.getOtherUserWantList(id, accessToken);
    const ids = otherUserFavoriteMovies.map((movie) => movie.movieid);
    let favoriteMovies = await Promise.all(ids.map(async(id) => {
      return await APIService.getIndividualMovie(id.toString())
    }))
    if(!isCancelled) {
      setWatchListMovies(favoriteMovies);
  }
  }
  getOtherUserFavMovies();
  
  return () => {
      isCancelled = true;
  }

}, [id])

useEffect(() => {
  if(!id) return
  let isCancelled = false;
  const getOtherUserBlackListMovies = async() => {
    const otherUserBlackListMovies = await ServerApiService.getOtherUserBlackList(id, accessToken);
    const ids = otherUserBlackListMovies.map((movie) => movie.movieid);
    let favoriteMovies = await Promise.all(ids.map(async(id) => {
      return await APIService.getIndividualMovie(id.toString())
    }))
    if(!isCancelled) {
      setBlackListedMovies(favoriteMovies);
  }
  }
  getOtherUserBlackListMovies();
  
  return () => {
      isCancelled = true;
  }

}, [id])


  return (
    <>
      <FavoriteMovieList criteria="Your Favorite Movies" movieList={watchListMovies}/>
      <FavoriteMovieList criteria='Your Blacklisted Movies' movieList={blackListedMovies}/>
    </>
  )
}

export default BlackAndWatchList
