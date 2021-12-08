import React from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { selectAuth } from '../../redux/features/modals/authSlice'
import { selectActivities } from '../../redux/features/user/activitiesSlice'
import ActivityCard from './activity-card/activity-card'
import { useParams } from "react-router-dom";
require('./activity-list.css')

const ActivityList = () => {
    let activities = useAppSelector(selectActivities);
    const accessToken = useAppSelector(selectAuth);
    const params = useParams();
    if (params.id) {
        activities = activities.filter(activity => (activity.uid === Number(params.id)) || (activity.friendid === Number(params.id)))
    }
    console.log(params, "PARAMS")

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
