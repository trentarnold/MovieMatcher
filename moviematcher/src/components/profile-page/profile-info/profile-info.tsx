import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/button';
import './profile-info.css'
import { IUser, IProfileInfo } from '../../../../../interfaces/userInterface';
import { ServerApiService } from '../../../services/ServerApi';
import { useAppSelector } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { useParams } from "react-router-dom";

type Props = {
  profile: IUser
}

const ProfileInfo:React.FC<Props> = ({profile}) => {

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({ id: 0, username: "", email: "", profile_pic: "", createdAt: "", updatedAt: "" })
  const [pic, setPic] = useState<File>();
  const [refresh, setRefresh] = useState(false)
  const [picUrl, setPicUrl] = useState('')
  const token = useAppSelector(selectAuth);
  const params = useParams();

  function handleChange (e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.files) setPic(e.currentTarget.files[0])
  }

  async function updatePicture () {
    try{
      if(pic){
        await ServerApiService.changeProfilePicture(token, pic)
        determinePicture()
       // setRefresh(!refresh)
      }
    } catch (e) {
      console.log (e);
      alert('error uploading picture')
    }
  }
 
  useEffect(() => {
    async function getInfo() {
      try {
        const info = await ServerApiService.getUser(token)
        setProfileInfo(info)
        determinePicture()
      } catch (e) {
        console.log(e)
      }
    }
    
    async function getOtherUserInfo(id: number) {
      try {
        const info = await ServerApiService.getSpecificUser(token, id);
        setProfileInfo(info)
        determinePicture()
      } catch (e) {
        console.log(e)
      }
    }
    
    if (params.id){
      console.log(params.id)
      getOtherUserInfo(Number(params.id))
    } else  getInfo()
   
  }, [token, refresh])


  const determinePicture = () =>{
    console.log(profileInfo.profile_pic)
    if (profileInfo.profile_pic[0] !== '/') {
        setPicUrl('https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png')
    } else setPicUrl(`http://localhost:3001${profileInfo.profile_pic}`)
  }
  


  return (
      <div className='profile-info'>
          <div className='profile-info-icons'>
            <img src={picUrl} alt="profile"/>
            {!params.id && <>
              <input type="file" onChange={handleChange}/>
              <Button onClick={updatePicture}>Update Photo</Button>
            </>}
          </div>
          <div className='profile-info-details'>
            <h1>{profileInfo.username}</h1>
            {params.id &&
            <div className="profile-info-buttons">
              <Button>Add/Delete</Button>
              <Button>Match</Button>
            </div>
            }
          </div>
      </div>
  )
}

export default ProfileInfo
