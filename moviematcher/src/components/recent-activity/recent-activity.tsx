import React from 'react'
import ActivityList from '../activity-list/activity-list'
require('./recent-activity.css');

const RecentActivity = () => {
    return (
        <div>
            <div className="activity-header">Recent Activity</div>
            <ActivityList />
        </div>
    )
}

export default RecentActivity
