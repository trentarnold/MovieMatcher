import React, {useState, useEffect} from 'react'
import { Movie, Results } from '../../../../interfaces/MovieInterface';
import MovieList from '../movie-list/movie-list';
import APIService from '../../services/APISevice';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])

    console.log(popularMovies)

    useEffect(() => {
        async function fetchPopular () {
            const popularMoviesRes = await APIService.getPopularMovies();
            const results = popularMoviesRes.results
            setPopularMovies(results);
        }
        fetchPopular()

    }, [])
    
    return (
        <div>
            <h1>home</h1>
            <MovieList movieList={popularMovies}/>
            <MovieList movieList={popularMovies}/>
        </div>
    )
}

export default Home
