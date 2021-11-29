import React from 'react'
import ActivityCard from './activity-card/activity-card'

const ActivityList = () => {
    return (
        <div className="recent-activity">
            <ActivityCard />
            <ActivityCard />
        </div>
    )
}

export default ActivityList
