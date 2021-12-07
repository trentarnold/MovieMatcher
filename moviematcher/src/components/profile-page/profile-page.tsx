import RecentActivity from '../recent-activity/recent-activity';
import { useEffect } from 'react';
import ProfileInfo from './profile-info/profile-info';
import './profile-page.css'
import BlackAndWatchList from '../BlackAndWatchList';

const ProfilePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, );

    return (
        <div className='profile'>
            <ProfileInfo />
            <BlackAndWatchList />
            <RecentActivity />
        </div>
    );
};

export default ProfilePage;
