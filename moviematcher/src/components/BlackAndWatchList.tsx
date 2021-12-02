import React, {useState, useEffect} from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { selectFavoriteMovieIds } from '../redux/features/user/watchListIds';
import { selectBlackListIds } from '../redux/features/user/blackListids';
import { MovieDetailsInterface } from '../../../interfaces/MovieDetails';
import  APIService  from '../services/APISevice';
import FavoriteMovieList from './FavoriteMovieList'

const BlackAndWatchList = () => {
  const favoriteMovieIds = useAppSelector(selectFavoriteMovieIds);
  const blackListIds = useAppSelector(selectBlackListIds);
  const [watchListMovies, setWatchListMovies] = useState<MovieDetailsInterface[]>([]);
  const [blackListedMovies, setBlackListedMovies] = useState<MovieDetailsInterface[]>([]);
  useEffect(() => {
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

}, [favoriteMovieIds])

useEffect(() => {
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

}, [blackListIds])
  return (
    <>
      <FavoriteMovieList criteria="Your Favorite Movies" movieList={watchListMovies}/>
      <FavoriteMovieList criteria='Your Blacklisted Movies' movieList={blackListedMovies}/>
    </>
  )
}

export default BlackAndWatchList
