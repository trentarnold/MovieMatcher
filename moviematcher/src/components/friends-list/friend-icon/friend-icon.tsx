import React from 'react';
import './friend-icon.css';
import {IUser} from '../../../../../interfaces/userInterface';
import { User } from '../../../../../interfaces/responses';
import {  useNavigate } from "react-router-dom";
import { ServerApiService } from '../../../services/ServerApi'
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks'
import { selectAuth } from '../../../redux/features/modals/authSlice'
import {setFriendIds} from '../../../redux/features/user/friendsIdSlice'
type Props = {
    user: User,
    friend: boolean,
}

const FriendIcon:React.FC<Props> = ({user, friend}) => {
    const accessToken = useAppSelector(selectAuth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const handleMatch = () => {
        console.log('match')
    };

    const handleAdd = async() => {
        const friendsList = await ServerApiService.addFriend(accessToken, user.id);
        let ids = friendsList.map((friend:User) => friend.id);
        dispatch(setFriendIds(ids));
    };
    const handleRemove = async() => {
        const friendsList = await ServerApiService.removeFriend(accessToken, user.id);
        let ids = friendsList.map((friend:User) => friend.id);
        dispatch(setFriendIds(ids));
    }
    const handleProfile = () => {
        navigate(`/profile/${user.id}`);
    };

    return (
        <div className="friend-icon">
            <img src={user.profile_pic} alt="profile"/>
            <div className="user-icon-middle">
              <p>{user.username}</p>
              <div className="user-icon-buttons">
                  {friend && <button onClick={handleMatch}>Match</button>}
                  {friend && <button onClick={handleRemove}> Remove </button>}
                  {!friend && <button onClick={handleAdd}>Add</button>}
                  <button onClick={handleProfile}>Profile</button>
              </div>
            </div>
            <div className="online-status"></div>
        </div>
    )
}

export default FriendIcon
