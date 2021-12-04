import React from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { selectAuth } from '../../redux/features/modals/authSlice'
import { selectActivities } from '../../redux/features/user/activitiesSlice'
import ActivityCard from './activity-card/activity-card'
require('./activity-list.css')

const ActivityList = () => {
    const activities = useAppSelector(selectActivities);
    const accessToken = useAppSelector(selectAuth);
    return (
        <div className="recent-activity">
            {accessToken 
                ? activities
                    ? activities.map(activity => <ActivityCard activity={activity}/>)
                    : <div className="no-activity-landing">No Recent Activity</div>
                : <div className="no-activity-landing">Please login to see recent activity</div>
            }
            
        </div>
    )
}

export default ActivityList
