import React from 'react'
import './friends-list.css'
import FriendIcon from './friend-icon/friend-icon'
import FriendButton from './friend-button/friend-button'
import FriendSearch from './friend-search/friend-search'
import { useAppSelector } from '../../redux/app/hooks'

const FriendsList = () => {
  
  const toggle = useAppSelector((state) => state.friendsList.value)

  return (
    <div className="friends-list" style={{visibility: toggle? 'visible' : 'hidden'}}>
      <FriendSearch />
      <div className="friend-icons">
        <FriendIcon />
        <FriendIcon />
        <FriendIcon />
        <FriendIcon />

      </div>
      <FriendButton />
    </div>
  )
}

export default FriendsList
