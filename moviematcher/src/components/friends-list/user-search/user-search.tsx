import { useState } from 'react'
import FriendIcon from '../friend-icon/friend-icon' 
import { profilePlaceholder } from '../../../profilePlaceholder'
import './user-search.css'

const UserSearch = () => {

    const [query, setQuery] = useState('')

    function handleChange (e: React.FormEvent<HTMLInputElement>) {
        const input = e.currentTarget.value
        setQuery(input);
    }

    return (
        <div className="user-search">
            <input className="search-bar" value={query} onChange={handleChange}/>
            <div className="user-icons"> 
              {/* <FriendIcon user={profilePlaceholder} friend={false}/> */}
            </div>
        </div>
    )
}

export default UserSearch