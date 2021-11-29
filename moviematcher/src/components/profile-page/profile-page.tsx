import React from 'react'
import MovieList from '../movie-list/movie-list';
import RecentActivity from '../recent-activity/recent-activity';
import ProfileInfo from './profile-info/profile-info';

const ProfilePage = () => {
    return (
        <div>
            <ProfileInfo />
            <MovieList movieList={[]} />
            <RecentActivity />
        </div>
    )
}

export default ProfilePage
