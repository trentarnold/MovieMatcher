import React, {useState} from 'react'
import './friend-search.css'
import FriendIcon from '../friend-icon/friend-icon'
import { profilePlaceholder } from '../../../profilePlaceholder'

const FriendSearch = () => {

  const [query, setQuery] = useState('')
  //const [friends, setFriends] = useState([])

  function handleChange (e: React.FormEvent<HTMLInputElement>) {
      const input = e.currentTarget.value
      setQuery(input);
  }
    
  //add useEffect to get friendslist from redux and set as initial state

  return (
    <div className="friend-search">
      <input className="search-bar" value={query} onChange={handleChange}/>
      <div className="friend-icons">
          <FriendIcon user={profilePlaceholder} friend={true}/>
          <FriendIcon user={profilePlaceholder} friend={true}/>
          <FriendIcon user={profilePlaceholder} friend={true}/>
        </div>

    </div>
  )
}

export default FriendSearch
