import React from 'react'
import './friend-icon.css'

const FriendIcon = () => {
    return (
        <div className="friend-icon">
            <img src="/pictures/cowboy.png" />
            <div className="user-icon-middle">
              <p>Name</p>
              <div className="user-icon-buttons">
                  <button>Match</button>
                  <button>Add</button>
                  <button>Profile</button>
              </div>
            </div>
            <div className="online-status"></div>
        </div>
    )
}

export default FriendIcon
