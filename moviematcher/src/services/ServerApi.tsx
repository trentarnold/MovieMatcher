import {AccessTokenResponse, User as UserInterface} from '../../../interfaces/responses'
import { UserPlaceholder } from '../UserPlaceholder'
import axios from 'axios';
const BASE_URL = 'http://localhost:3001'
interface User {
  username:string,
  email:string,
  password:string,
  profile_pic:string | ArrayBuffer | null
}

export const ServerApiService = {
  createUser: async(user:User): Promise<AccessTokenResponse> => {
    try {
      let response = await fetch(`${BASE_URL}/user/create`, {
        method:'POST',
        mode:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return {user: UserPlaceholder, accessToken:''}
    }
  },
  userLogin: async(username:string, password:string): Promise<AccessTokenResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      const {user, accessToken} = await response.json()
      return {user, accessToken};
    } catch (e) {
      console.log(e);
      return {user: UserPlaceholder, accessToken:''};
    }
  },
  getFriends: async(accessToken:string): Promise<UserInterface[]> => {
    try{
      const response = await fetch(`${BASE_URL}/user/friends`, {
        method: 'Get',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return [UserPlaceholder]
    }
  },
  getUser: async(accessToken:string): Promise<UserInterface> => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return UserPlaceholder;
    }
  },
  updateUser: async(accessToken:string, image:File): Promise<UserInterface> => {
    try {
      const fd= new FormData();
      fd.append('image', image)
      return await axios.post(`${BASE_URL}/user/picture`, fd, {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
        },
      }); 
    } catch (e) {
      console.log(e);
      return UserPlaceholder;
    }
  }
}



// router.get('/user/otherUser', authMiddleware, getSpecificUser) // Not for user calls, internal use only!
// router.get('user/allPeople', authMiddleware, getAllPeople)
