import React, {useState, useEffect} from 'react'
import { Movie, Results } from '../../../../interfaces/MovieInterface';
import MovieList from '../movie-list/movie-list';
import APIService from '../../services/APISevice';
import './home.css'

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    
    useEffect(() => {
        async function fetchPopular () {
            const popularMoviesRes = await APIService.getPopularMovies();
            const results = popularMoviesRes.results
            setPopularMovies(results);
        }
        fetchPopular()

    }, [])
    
    return (
        <div className="home">
            <MovieList criteria="Popular Movies" movieList={popularMovies}/>
            <MovieList criteria="Bad Movies" movieList={popularMovies}/>
            <MovieList criteria="Good Movies" movieList={popularMovies}/>
            <MovieList criteria="Illegal Movies" movieList={popularMovies}/>
            <MovieList criteria="Horror Movies" movieList={popularMovies}/>
        </div>
    )
}

export default Home
