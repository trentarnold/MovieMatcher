import { useState } from 'react';
import './friends-list.css';
import FriendSearch from './friend-search/friend-search';
import UserSearch from './user-search/user-search';
import { useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/features/modals/authSlice';

const FriendsList = () => {
  
  const auth = useAppSelector(selectAuth);
  const toggle = useAppSelector((state) => state.friendsList.value);
  const [friendsToggle, setFriendsToggle] = useState<boolean>(true);
  const [searchToggle, setSearchToggle] = useState<boolean>(false);

  function handleFriendsClick () {
    setSearchToggle(false);
    setFriendsToggle(true);
  };

  function handleSearchClick () {
    setFriendsToggle(false);
    setSearchToggle(true);
  };

  return (
    <div className="friends-list" style={{visibility: toggle && auth? 'visible' : 'hidden'}}>
      <div className='friends-list-toggle'>
        <button onClick={handleFriendsClick}>Friends List</button>
        <button onClick={handleSearchClick}>Search Users</button>
      </div>
      {friendsToggle && <FriendSearch />}
      {searchToggle && <UserSearch />}
    </div>
  )
}

export default FriendsList
