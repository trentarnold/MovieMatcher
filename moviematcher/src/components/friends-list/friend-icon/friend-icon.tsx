import React from 'react'
import './friend-icon.css'

const FriendIcon = () => {
    return (
        <div className="friend-icon">
            <img src="/pictures/cowboy.png" />
            <p>Name</p>
            <div className="online-status"></div>
        </div>
    )
}

export default FriendIcon
