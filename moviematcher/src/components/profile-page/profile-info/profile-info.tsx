import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/button';
import './profile-info.css'
import { IUser } from '../../../../../interfaces/userInterface';
import { ServerApiService } from '../../../services/ServerApi';
import { useAppSelector } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';

type Props = {
  profile: IUser
}



const ProfileInfo:React.FC<Props> = ({profile}) => {

  const [pic, setPic] = useState<File>()
  const token = useAppSelector(selectAuth)


  function handleChange (e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.files) setPic(e.currentTarget.files[0])
  }

  async function updatePicture () {
    try{
      if(pic){
        const response = await ServerApiService.updateUser(token, pic)
        console.log(response)
      }
    } catch (e) {
      console.log (e);
    }
  }

  useEffect(() => {
    async function getInfo() {
      // const info = await ServerApiService.getUser(token)
      // console.log(info)
    }
    getInfo()
  }, [token])

  return (
      <div className='profile-info'>
          <div className='profile-info-icons'>
            <img src={String(profile.profilePic)} alt="profile"/>
              <input type="file" onChange={handleChange}/>
              <button onClick={updatePicture}>button</button>
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
