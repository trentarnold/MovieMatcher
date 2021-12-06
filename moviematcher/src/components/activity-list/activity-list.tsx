import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { selectAuth } from '../../redux/features/modals/authSlice'
import { selectActivities } from '../../redux/features/user/activitiesSlice'
import ActivityCard from './activity-card/activity-card'
import { useParams } from 'react-router-dom';
import RecentActivityModal from './recentActivityModal/RecentActivityModal'
import { useAppDispatch } from '../../redux/app/hooks';
import { turnOnActivityListModal } from '../../redux/features/modals/activityListModal'
require('./activity-list.css')

const ActivityList = () => {
    const activities = useAppSelector(selectActivities);
    const accessToken = useAppSelector(selectAuth);
    const { movieId, otherUserName} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(movieId && otherUserName) {
            dispatch(turnOnActivityListModal())
        }
    }, [])
    return (
        <div className="recent-activity">
            {accessToken 
                ? activities
                    ? activities.map(activity => <ActivityCard activity={activity}/>)
                    : <div className="no-activity-landing">No Recent Activity</div>
                : <div className="no-activity-landing">Please login to see recent activity</div>
            }
            {movieId && otherUserName && <RecentActivityModal movieId = {movieId} otherUserName = {otherUserName}/>}
        </div>
    )
}

export default ActivityList
