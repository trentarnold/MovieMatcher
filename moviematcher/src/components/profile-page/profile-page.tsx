import {useEffect, useState} from 'react'
import MovieList from '../movie-list/movie-list';
import RecentActivity from '../recent-activity/recent-activity';
import ProfileInfo from './profile-info/profile-info';
//import APIService from '../../services/APISevice';
//import { Movie } from '../../../../interfaces/MovieInterface';
import './profile-page.css'
import { profilePlaceholder } from '../../profilePlaceholder';

const ProfilePage = () => {
    
    //const[moviesToDisplay, setMoviesToDisplay] = useState<Movie>([])
    
    useEffect(() => {
        // async function populatMovieList () {
        //     setMoviesToDisplay(profilePlaceholder.viewHistory.map(movie=> APIService.getMovieInfo(movie)))
        // } 

   

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
