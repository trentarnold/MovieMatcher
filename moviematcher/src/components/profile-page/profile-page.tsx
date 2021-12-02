import RecentActivity from '../recent-activity/recent-activity';
import ProfileInfo from './profile-info/profile-info';
import './profile-page.css'
import { profilePlaceholder } from '../../profilePlaceholder';
import BlackAndWatchList from '../BlackAndWatchList';
const ProfilePage = () => {

    //const[moviesToDisplay, setMoviesToDisplay] = useState<Movie>([])
    

    return (
        <div className='profile'>
            <ProfileInfo profile={profilePlaceholder}/>
            <BlackAndWatchList />
            <RecentActivity />
        </div>
    )
}

export default ProfilePage
