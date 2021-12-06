import React, {useState, useEffect} from 'react'
import { Movie } from '../../../../interfaces/movieInterface';
import MovieList from '../movie-list/movie-list';
import APIService from '../../services/APISevice';
import BlackAndWatchList from '../BlackAndWatchList';
import { useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/features/modals/authSlice';
import './home.css'

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
    const [horrorMovies, setHorrorMovies] = useState<Movie[]>([])
    const [comedyMovies, setComedyMovies] = useState<Movie[]>([])
    const [dramaMovies, setDramaMovies] = useState<Movie[]>([])
    const [sciFiMovies, setSciFiMovies] = useState<Movie[]>([])
    const [actionMovies, setActionMovies] = useState<Movie[]>([])
    const accessToken = useAppSelector(selectAuth)
    
    useEffect(() => {
        async function fetchPopular () {
            const popularMoviesRes = await APIService.getPopularMovies();
            const upcomingMoviesRes = await APIService.getUpcomingMovies();
            const horrorMoviesRes = await APIService.getHorrorMovies();
            const actionMoviesRes = await APIService.getActionMovies();
            const sciFiMoviesRes = await APIService.getSciFiMovies();
            const dramaMoviesRes = await APIService.getDramaMovies();
            const comedyMoviesRes = await APIService.getComedyMovies();
            setPopularMovies(popularMoviesRes.results);
            setUpcomingMovies(upcomingMoviesRes.results);
            setHorrorMovies(horrorMoviesRes.results);
            setComedyMovies(comedyMoviesRes.results);
            setDramaMovies(dramaMoviesRes.results);
            setSciFiMovies(sciFiMoviesRes.results);
            setActionMovies(actionMoviesRes.results);
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
            {
            accessToken && <BlackAndWatchList />
            }
            <MovieList criteria="Popular Movies" movieList={popularMovies}/>
            <MovieList criteria="In Theatres" movieList={upcomingMovies}/>
            <MovieList criteria="Comedy Movies" movieList={comedyMovies}/>
            <MovieList criteria="Horror Movies" movieList={horrorMovies}/>
            <MovieList criteria="Action Movies" movieList={actionMovies}/>
            <MovieList criteria="Science Fiction Movies" movieList={sciFiMovies}/>
            <MovieList criteria="Drama Movies" movieList={dramaMovies}/>
            
        </div>
    )
}

export default Home
