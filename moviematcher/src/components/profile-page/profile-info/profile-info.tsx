import React, { useState } from 'react'
import { Button } from '@chakra-ui/button';
import './profile-info.css'
import { IUser } from '../../../../../interfaces/userInterface';

type Props = {
  profile: IUser
}



const ProfileInfo:React.FC<Props> = ({profile}) => {

  const [pic, setPic] = useState<File>()
  const [base64,setBase64] = useState<string | ArrayBuffer | null>('')

  function getBase64() {
    const reader = new FileReader();
    if(pic) reader.readAsDataURL(pic);
    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  function handleChange (e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.files) setPic(e.currentTarget.files[0])
  }
    return (
        <div className='profile-info'>
            <div className='profile-info-icons'>
              <img src={String(profile.profilePic)} alt="profile"/>
                <input type="file" onChange={handleChange}/>
                <button onClick={getBase64}>button</button>
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
