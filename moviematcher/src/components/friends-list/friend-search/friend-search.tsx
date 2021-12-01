import React, {useState, useEffect} from 'react';
import './friend-search.css';
import FriendIcon from '../friend-icon/friend-icon';
import { profilePlaceholder } from '../../../profilePlaceholder';
import { ServerApiService } from '../../../services/ServerApi';
import { useAppSelector } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { User } from '../../../../../interfaces/responses';
const FriendSearch = () => {
  const accessToken = useAppSelector(selectAuth)
  const [query, setQuery] = useState('');
  const [friends, setFriends] = useState<User[]>([]);
  console.log(friends)
  function handleChange (e: React.FormEvent<HTMLInputElement>) {
      const input = e.currentTarget.value
      setQuery(input);
  }
    useEffect(() => {
      let isCancelled = false;
      const fetchFriends = async() => {
       let userFriends = await ServerApiService.getFriends(accessToken);
       if(!isCancelled) {
         setFriends(userFriends)
       }
      }
      if(accessToken) {
        fetchFriends()
      }
      return () => {
        isCancelled = true;
      }
    }, [accessToken])
  //add useEffect to get friendslist from redux and set as initial state

  return (
    <div className="friend-search">
      <input className="search-bar" value={query} onChange={handleChange}/>
      <div className="friend-icons">
        {friends.map((friend:any) => {
          return <FriendIcon user={friend} friend={true} />
        })}
          {/* <FriendIcon user={profilePlaceholder} friend={true}/>
          <FriendIcon user={profilePlaceholder} friend={true}/>
          <FriendIcon user={profilePlaceholder} friend={true}/> */}
        </div>

    </div>
  )
}

export default FriendSearch
