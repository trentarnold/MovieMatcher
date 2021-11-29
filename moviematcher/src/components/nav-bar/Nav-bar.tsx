import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@chakra-ui/button';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { turnOnLogin } from '../../redux/features/modals/loginSlice';
import { toggleFriendsList } from '../../redux/features/modals/friendsListSlice'

import './nav-bar.css'
const Navbar = () => {
  
  const dispatch = useAppDispatch()
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
        <Button onClick={() => dispatch(toggleFriendsList())}> Friends </Button>
        <Button onClick={() => dispatch(turnOnLogin())}> Login </Button>
      </div>
    </div>
  )
}

export default Navbar
