import React from 'react'
import { Button } from '@chakra-ui/button';
import './profile-info.css'
import { IUser } from '../../../../../interfaces/userInterface';

type Props = {
  profile: IUser
}

const ProfileInfo:React.FC<Props> = ({profile}) => {


    return (
        <div className='profile-info'>
            <div className='profile-info-icons'>
              <img src={String(profile.profilePic)} alt="profile"/>
              <div className="profile-info-buttons">
                <Button>Add/Delete</Button>
                <Button>Match</Button>
              </div>
            </div>
            <div className='profile-info-details'>
              <p>{profile.username}</p>
            </div>
        </div>
    )
}

export default ProfileInfo
