import React from 'react'
import { Button } from '@chakra-ui/button';
import './profile-info.css'


const ProfileInfo = () => {
    return (
        <div className='profile-info'>
            <div>
              <img src='/pictures/cowboy.png'/>
            </div>
            <div>
              <p>Name</p>
              <p>Description</p>
              <Button>Add/Delete</Button>
              <Button>Match</Button>
            </div>
        </div>
    )
}

export default ProfileInfo
