import {useEffect, useState} from 'react'
import MovieList from '../movie-list/movie-list';
import RecentActivity from '../recent-activity/recent-activity';
import ProfileInfo from './profile-info/profile-info';
import APIService from '../../services/APISevice';
import { Movie } from '../../../../interfaces/MovieInterface';
import './profile-page.css'
import { profilePlaceholder } from '../../profilePlaceholder';

const ProfilePage = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    
    //const[moviesToDisplay, setMoviesToDisplay] = useState<Movie>([])
    
    useEffect(() => {
        // async function populatMovieList () {
        //     setMoviesToDisplay(profilePlaceholder.viewHistory.map(movie=> APIService.getMovieInfo(movie)))
        // } 

        async function fetchPopular () {
            const popularMoviesRes = await APIService.getPopularMovies();
            const results = popularMoviesRes.results
            setPopularMovies(results);
        }
        fetchPopular()
        //populatMovieList()

    }, [])

    return (
        <div className='profile'>
            <ProfileInfo profile={profilePlaceholder}/>
            <MovieList criteria="Recently Watched" movieList={[]/*moviesToDisplay*/} />
            <RecentActivity />
        </div>
    )
}

export default ProfilePage
