import React from 'react'
import MovieList from '../movie-list/movie-list';
import RecentActivity from '../recent-activity/recent-activity';
import ProfileInfo from './profile-info/profile-info';
import './profile-page.css'

const ProfilePage = () => {
    return (
        <div className='profile'>
            <ProfileInfo />
            <MovieList movieList={[]} />
            <RecentActivity />
        </div>
    )
}

export default ProfilePage
