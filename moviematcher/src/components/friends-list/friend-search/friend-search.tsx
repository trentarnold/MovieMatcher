import React, {useState} from 'react'
import './friend-search.css'
import FriendIcon from '../friend-icon/friend-icon'

const FriendSearch = () => {

  const [query, setQuery] = useState('')

    function handleChange (e: React.FormEvent<HTMLInputElement>) {
        const input = e.currentTarget.value
        setQuery(input);
    }
    
  return (
    <div className="friend-search">
      <input className="search-bar" value={query} onChange={handleChange}/>
      <div className="friend-icons">
          <FriendIcon />
          <FriendIcon />
          <FriendIcon />
          <FriendIcon />
        </div>

    </div>
  )
}

export default FriendSearch
