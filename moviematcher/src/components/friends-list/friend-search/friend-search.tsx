import React from 'react'
import './friend-search.css'
import FriendIcon from '../friend-icon/friend-icon'

const FriendSearch = () => {
  return (
    <div className="friend-search">
      <input></input>
      <div className="friend-icons">
          <FriendIcon />
          <FriendIcon />
          <FriendIcon />
          <FriendIcon />
        </div>

    </div>
  )
}

export default FriendSearch
