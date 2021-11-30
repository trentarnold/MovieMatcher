import React, {useState, useEffect} from 'react'
import { Movie } from '../../../../interfaces/MovieInterface';
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
            <div className='spinner-holder'>
                <div className='welcome-text'> 
                Welcome to <img style={{height: '30vh'}} className="logo" src="/logo-brighter.svg" alt="logo" />
                </div>
                <div className="reel">
                    <i></i>
                </div>
                <div className="reel">
                    <i></i>
                </div>
            </div>
            <MovieList criteria="Popular Movies" movieList={popularMovies}/>
            <MovieList criteria="Bad Movies" movieList={popularMovies}/>
            <MovieList criteria="Good Movies" movieList={popularMovies}/>
            <MovieList criteria="Illegal Movies" movieList={popularMovies}/>
            <MovieList criteria="Horror Movies" movieList={popularMovies}/>
        </div>
    )
}

export default Home
