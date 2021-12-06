import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { selectAuth } from '../../redux/features/modals/authSlice'
import { selectActivities } from '../../redux/features/user/activitiesSlice'
import ActivityCard from './activity-card/activity-card'
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import RecentActivityModal from './recentActivityModal/RecentActivityModal'
import { useAppDispatch } from '../../redux/app/hooks';
import { turnOnActivityListModal } from '../../redux/features/modals/activityListModal'
=======
import { useParams } from "react-router-dom";
>>>>>>> 4b91b5e6af635eb6276da5276d5acf2f3d269ef2
require('./activity-list.css')

const ActivityList = () => {
    let activities = useAppSelector(selectActivities);
    const accessToken = useAppSelector(selectAuth);
<<<<<<< HEAD
    const { movieId, otherUserName} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(movieId && otherUserName) {
            dispatch(turnOnActivityListModal())
        }
    }, [])
=======
    const params = useParams();
    if (params.id) {
        activities = activities.filter(activity => (activity.uid === Number(params.id)) || (activity.friendid === Number(params.id)))
    }
    console.log(params, "PARAMS")

>>>>>>> 4b91b5e6af635eb6276da5276d5acf2f3d269ef2
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
