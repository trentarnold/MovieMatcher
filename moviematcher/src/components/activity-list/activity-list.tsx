import { useEffect } from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { selectAuth } from '../../redux/features/modals/authSlice'
import { selectActivities } from '../../redux/features/user/activitiesSlice'
import ActivityCard from './activity-card/activity-card'
import { useParams } from 'react-router-dom';
import RecentActivityModal from './recentActivityModal/RecentActivityModal'
import { useAppDispatch } from '../../redux/app/hooks';
import { turnOnActivityListModal } from '../../redux/features/modals/activityListModal'
import {IActivity} from '../../../../interfaces/activityInterface'
import moment from 'moment';
import { selectUserId } from '../../redux/features/user/userIdSlice'
require('./activity-list.css')

const ActivityList = () => {
    const user = useAppSelector(selectUserId);
    let activitiesRaw = useAppSelector(selectActivities);
    let activities: IActivity[] = [];

    activitiesRaw.map(a => {
        let hold;
        if (a.friendid === user) {
            hold = {...a}
            hold.friendid = hold.uid;
            hold.uid = user;
            activities.push(hold)
        } else activities.push(a)
        return a
    });

    const accessToken = useAppSelector(selectAuth);
    const { movieId, otherUserName} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(movieId && otherUserName) {
            dispatch(turnOnActivityListModal())
        };
    }, []);

    function filterActivities() {
        let activitiesArr: IActivity[] = [];
        activities.map(act => {
            if (act.friendid) {
                let trigger = false;
                for (let actArr of activitiesArr) {
                    if (act.friendid === actArr.friendid && act.movieid === actArr.movieid && moment(act.createdAt).diff(actArr.createdAt, 'days') === 0) {
                        trigger = true;
                    };
                };
                if (!trigger) activitiesArr.push(act)
            } else {activitiesArr.push(act)};
        })
        return activitiesArr;
    };

    const params = useParams();
    if (params.id) {
        activities = activities.filter(activity => (activity.uid === Number(params.id)) || (activity.friendid === Number(params.id)))
    };

    return (
        <div className="recent-activity">
            {accessToken 
                ? activitiesRaw
                    ? filterActivities().map(activity => <ActivityCard activity={activity}/>)
                    : <div className="no-activity-landing">No Recent Activity</div>
                : <div className="no-activity-landing">Please login to see recent activity</div>
            }
            {movieId && otherUserName && <RecentActivityModal movieId = {movieId} otherUserName = {otherUserName}/>}
        </div>
    );
};

export default ActivityList;
