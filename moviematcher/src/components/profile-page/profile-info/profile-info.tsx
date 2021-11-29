import React from 'react'
import { Button } from '@chakra-ui/button';
import './profile-info.css'
import { profilePlaceholder } from '../../../profilePlaceholder';


const ProfileInfo = () => {


    return (
        <div className='profile-info'>
            <div className='profile-info-icons'>
              <img src={String(profilePlaceholder.profilePic)}/>
              <div className="profile-info-buttons">
                <Button>Add/Delete</Button>
                <Button>Match</Button>
              </div>
            </div>
            <div className='profile-info-details'>
              <p>{profilePlaceholder.username}</p>
            </div>
        </div>
    )
}

export default ProfileInfo
