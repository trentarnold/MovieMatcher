import React, { useEffect, useState } from 'react'
import ActivityList from '../activity-list/activity-list'
import { useParams } from "react-router-dom";
import { useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/features/modals/authSlice';
import { ServerApiService } from '../../services/ServerApi'
require('./recent-activity.css');


const RecentActivity = () => {
    const params = useParams();
    const accessToken = useAppSelector(selectAuth)
    const [username, setUsername] = useState<string>(); 

    useEffect(() => {
        window.scrollTo(0, 0);
        async function getUser() {
            const user = await ServerApiService.getSpecificUser(accessToken, Number(params.id))
            setUsername(user.username);
        }
        if (params.id) getUser();
    }, [])

    return (
        <div>
            <div className="activity-header">{username ? username + '\'s' : ''} Recent Activity</div>
            <ActivityList />
        </div>
    )
}

export default RecentActivity
