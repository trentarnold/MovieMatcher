import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@chakra-ui/button';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { turnOnLogin } from '../../redux/features/modals/loginSlice';

import './nav-bar.css'
const Navbar = () => {
  
  const dispatch = useAppDispatch()
  return (
    <div className="nav-bar">
      <NavLink to="/">
        <h1>Movie Matcher</h1>
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
      <Button onClick={() => dispatch(turnOnLogin())}> Login </Button>
    </div>
  )
}

export default Navbar
