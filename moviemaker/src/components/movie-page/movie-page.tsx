import MovieList from '../movie-list/movie-list';
import MovieDetails from './movie-details/movie-details';
import React, {useState, useEffect} from 'react';
import APIService from '../../services/APISevice';
import { Movie } from '../../../../interfaces/MovieInterface';

const MoviePage = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  useEffect(() => {
    async function fetchPopular () {
        const fetchedPopularMovies  = await APIService.getPopularMovies();
        setPopularMovies(fetchedPopularMovies.results)
    }
    fetchPopular()

}, [])
    return (
        <div>
            <MovieDetails />
            <MovieList movieList = {popularMovies} />
        </div>
    )
}

export default MoviePage
