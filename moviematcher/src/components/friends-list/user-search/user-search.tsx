import { useState, useEffect } from 'react'
import FriendIcon from '../friend-icon/friend-icon' 
import { User } from '../../../../../interfaces/responses'
import { useAppSelector } from '../../../redux/app/hooks'
import { selectAuth } from '../../../redux/features/modals/authSlice'
import { selectFriendIds } from '../../../redux/features/user/friendsIdSlice'
import { selectUserId } from '../../../redux/features/user/userIdSlice'
import { ServerApiService } from '../../../services/ServerApi'
import './user-search.css'

const UserSearch = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [query, setQuery] = useState('');
    const accessToken = useAppSelector(selectAuth);
    const friendIds = useAppSelector(selectFriendIds);
    const yourId = useAppSelector(selectUserId);
    function handleChange (e: React.FormEvent<HTMLInputElement>) {
        const input = e.currentTarget.value
        setQuery(input);
    }
    useEffect(() => {
        let isCancelled = false;
        const fetchUsers = async() => {
         let otherUsers = await ServerApiService.getAllUsers(accessToken);
         if(!isCancelled) {
           setUsers(otherUsers)
         }
        }
        if(accessToken) {
          fetchUsers()
        }
        return () => {
          isCancelled = true;
        }
      }, [accessToken, friendIds])

    return (
        <div className="user-search">
            <input className="search-bar" value={query} onChange={handleChange}/>
            <div className="user-icons"> 
            {users.map((user:User) => {
                if(user.id === yourId) return ''
                return <FriendIcon key={user.id} user={user} friend={friendIds.includes(user.id)}/>
            })}
            </div>
        </div>
    )
}

export default UserSearch