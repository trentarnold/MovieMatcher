import React from 'react'
import './friends-list.css'
import FriendIcon from './friend-icon/friend-icon'
import FriendButton from './friend-button/friend-button'
import FriendSearch from './friend-search/friend-search'

const FriendsList = () => {
  return (
    <div className="friends-list">
      <FriendSearch />
      <FriendIcon />
      <FriendButton />
    </div>
  )
}

export default FriendsList
