import React, {useState, useEffect} from 'react';
import './friend-search.css';
import FriendIcon from '../friend-icon/friend-icon';
import { ServerApiService } from '../../../services/ServerApi';
import { setFriendIds } from '../../../redux/features/user/friendsIdSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { User } from '../../../../../interfaces/responses';
import { selectFriendIds } from '../../../redux/features/user/friendsIdSlice';
const FriendSearch = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuth);
  const friendIds = useAppSelector(selectFriendIds);
  const [query, setQuery] = useState('');
  const [friends, setFriends] = useState<User[]>([]);
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
    }, [accessToken, friendIds])

  return (
    <div className="friend-search">
      <input className="search-bar" value={query} onChange={handleChange}/>
      <div className="friend-icons">
        {friends.map((friend:any) => {
          return <FriendIcon key={friend.id} user={friend} friend={true} />
        })}
        </div>

    </div>
  )
}

export default FriendSearch
