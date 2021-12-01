import React from 'react'
import './friend-icon.css'
import {IUser} from '../../../../../interfaces/userInterface';
import { User } from '../../../../../interfaces/responses'

type Props = {
    user: User,
    friend: boolean,
}

const FriendIcon:React.FC<Props> = ({user, friend}) => {

    const handleMatch = () => {
        console.log('match')
    };

    const handleAdd = () => {
        console.log('add')

    };

    const handleProfile = () => {
        console.log('profile')
    };

    return (
        <div className="friend-icon">
            <img src={user.profile_pic} alt="profile"/>
            <div className="user-icon-middle">
              <p>{user.username}</p>
              <div className="user-icon-buttons">
                  {friend && <button onClick={handleMatch}>Match</button>}
                  {!friend && <button onClick={handleAdd}>Add</button>}
                  <button onClick={handleProfile}>Profile</button>
              </div>
            </div>
            <div className="online-status"></div>
        </div>
    )
}

export default FriendIcon
