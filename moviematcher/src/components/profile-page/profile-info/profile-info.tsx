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
  const [url, setUrl] = useState('')
  const token = useAppSelector(selectAuth)


  function handleChange (e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.files) setPic(e.currentTarget.files[0])
  }

  async function updatePicture () {
    try{
      if(pic){
        const response = await ServerApiService.changeProfilePicture(token, pic)
        const filePath = response.data.filePath;
        await ServerApiService.updateUserInfo(token, 'profile_pic', filePath);
        setUrl(filePath);
      }
    } catch (e) {
      console.log (e);
      alert('error uploading picture')
    }
  }
 
  useEffect(() => {
    async function getInfo() {
      const info = await ServerApiService.getUser(token)
      setUrl(info.profile_pic)
      console.log(info)
    }
    getInfo()
  }, [token, url])

  return (
      <div className='profile-info'>
          <div className='profile-info-icons'>
            <img src={`http://localhost:3001${url}`} alt="profile"/>
              <input type="file" onChange={handleChange}/>
              <Button onClick={updatePicture}>Update Photo</Button>
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
