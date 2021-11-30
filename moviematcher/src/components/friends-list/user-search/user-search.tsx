import FriendIcon from '../friend-icon/friend-icon' 
import './user-search.css'

const UserSearch = () => {

    return (
        <div className="user-search">
            <input />
            <div className="user-icons"> 
                <FriendIcon />
                <FriendIcon />
                <FriendIcon />
            </div>
        </div>
    )
}

export default UserSearch