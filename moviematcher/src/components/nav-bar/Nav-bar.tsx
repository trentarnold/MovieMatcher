import { NavLink } from 'react-router-dom'
import { Button } from '@chakra-ui/button';
import { useAppDispatch, useAppSelector  } from '../../redux/app/hooks';
import { turnOnLogin } from '../../redux/features/modals/loginSlice';
import { toggleFriendsList } from '../../redux/features/modals/friendsListSlice'
import { clearToken, selectAuth } from '../../redux/features/modals/authSlice';

import './nav-bar.css'
const Navbar = () => {
  
  const auth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const handleLogOut = () =>{
    dispatch(clearToken())
  }
  
  return (
    <div className="nav-bar">
      <div className="nav-areas">
        <NavLink to="/">
          <img className="logo" src="/logo.svg" alt="logo" />
        </ NavLink>
        <NavLink to='/recent'>
          <p>Recent Activity</p>
        </NavLink>
        <NavLink to='/profile'>
          <p>Profile</p>
        </NavLink>
        <NavLink to='movieDetails'>
          <p>Movie Details</p>
        </NavLink>
      </div>
      <div className="buttons">
        {auth && <Button onClick={() => dispatch(toggleFriendsList())}> Friends </Button>}
        {!auth && <Button onClick={() => dispatch(turnOnLogin())}> Login </Button>}
        {auth && <Button onClick={handleLogOut}>Log Out</Button>}
      </div>
    </div>
  )
}

export default Navbar
