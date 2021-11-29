import MovieList from '../movie-list/movie-list';
import MovieDetails from './movie-details/movie-details';
import React, {useState, useEffect} from 'react';
import APIService from '../../services/APISevice';
import { Movie } from '../../../../interfaces/MovieInterface';
import { useParams } from 'react-router';
const MoviePage = () => {
  const { id } : any = useParams();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  useEffect(() => {
    let isCancelled = false;
    async function fetchPopular () {
        const fetchedPopularMovies  = await APIService.getSimilarMovies(id);
        if(!isCancelled) {
            setSimilarMovies(fetchedPopularMovies.results)
        }
    }
    fetchPopular()
    return () => {
        isCancelled = true;
    }
  }, [id])
    return (
        <div>
            <MovieDetails />
            <MovieList criteria = 'Popular Movies' movieList = {similarMovies} />
        </div>
    )
}

export default MoviePage
