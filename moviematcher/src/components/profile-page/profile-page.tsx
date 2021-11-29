import {useEffect, useState} from 'react'
import MovieList from '../movie-list/movie-list';
import RecentActivity from '../recent-activity/recent-activity';
import ProfileInfo from './profile-info/profile-info';
import APIService from '../../services/APISevice';
import { Movie } from '../../../../interfaces/MovieInterface';
import './profile-page.css'

const ProfilePage = () => {
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
        <div className='profile'>
            <ProfileInfo />
            <MovieList movieList={popularMovies} />
            <RecentActivity />
        </div>
    )
}

export default ProfilePage
