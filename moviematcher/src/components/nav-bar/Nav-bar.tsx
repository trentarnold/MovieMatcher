import { NavLink } from 'react-router-dom'
import { Button } from '@chakra-ui/button';
import { useAppDispatch, useAppSelector  } from '../../redux/app/hooks';
import { turnOnLogin } from '../../redux/features/modals/loginSlice';
import { selectFriendsList, toggleFriendsList } from '../../redux/features/modals/friendsListSlice'
import { clearToken, selectAuth } from '../../redux/features/modals/authSlice';
import { selectSocketRef } from '../../redux/features/socket/socketRefSlice';

import './nav-bar.css'
const Navbar = () => {
  const auth = useAppSelector(selectAuth)
  const socket = useAppSelector(selectSocketRef)
  const dispatch = useAppDispatch()
  let listBool = useAppSelector(selectFriendsList) 

  const handleLogOut = () =>{
    socket.emit('logout')
    dispatch(clearToken())
    if (listBool === true)dispatch(toggleFriendsList())
  }
  
  return (
    <div className="nav-bar">
      <div className="nav-areas">
        <NavLink to="/">
          <img className="logo enlarge-on-hover" src="/logo.svg" alt="logo" />
        </ NavLink>
        { auth &&
        <>
        <NavLink to='/recent' 
          style={({ isActive }) => ({  border: isActive ? '2px solid gray': '', padding:'10px',
          borderRadius: isActive ? '1rem': '',})} className='navlink-item enlarge-on-hover'>
          Recent Activity
        </NavLink>
        <NavLink to='/profile'
          style={({ isActive }) => ({  border: isActive ? '2px solid gray': '', padding:'10px',
          borderRadius: isActive ? '1rem': '',})} className='navlink-item enlarge-on-hover'>
          Profile
        </NavLink>
        </>
      }
      </div>
      <div className="buttons">
        {auth && <Button className='enlarge-on-hover margin-right' onClick={() => dispatch(toggleFriendsList())}> Friends </Button>}
        {!auth && <Button className='enlarge-on-hover' onClick={() => dispatch(turnOnLogin())}> Login </Button>}
        {auth && <Button className='enlarge-on-hover' onClick={handleLogOut}>Log Out</Button>}
      </div>
    </div>
  )
}

export default Navbar
