import {AccessTokenResponse, PictureChange, User as UserInterface} from '../../../interfaces/responses'
import { UserPlaceholder } from '../UserPlaceholder'
import { FavoriteMovieInterface, MovieWithRatingInterface } from '../../../interfaces/favoriteMovieInterface'
import { activityInterface } from '../../../interfaces/activityInterface';
import axios from 'axios';
import { access } from 'fs';
const BASE_URL = 'http://localhost:3001'
interface User {
  username:string,
  email:string,
  password:string,
  profile_pic:string | ArrayBuffer | null
}
export const ServerApiService = {
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
        method: 'GET',
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
  getAllUsers: async(accessToken:string): Promise<UserInterface[]> => {
    try{
      const response = await fetch(`${BASE_URL}/user/allPeople`, {
        method: 'GET',
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
  getSpecificUser: async(accessToken:string, id:number): Promise<UserInterface> => {
    try{
      const response = await fetch(`${BASE_URL}/user/otherUser`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body:JSON.stringify({id})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return UserPlaceholder
    }
  },
  removeFriend: async(accessToken:string, friendId:number): Promise<UserInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/friends`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({friendid:friendId})
      })
      return await response.json();
    }catch(err) {
      console.log(err)
      return [UserPlaceholder]
    }
  },
  addFriend: async(accessToken:string, friendId:number): Promise<UserInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/friends`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({friendid:friendId})
      })
      return await response.json();
    }catch(err) {
      console.log(err)
      return [UserPlaceholder]
    }
  },
  changeProfilePicture: async(accessToken:string, image:File): Promise<PictureChange> => {
    try {
      const fd= new FormData();
      fd.append('image', image)
      return await axios.put(`${BASE_URL}/user/profile`, fd, {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
        },
      });
    } catch (e) {
      console.log(e);
      return {data: {fileName: "", filePath:""}};
    }
  },
  addToWatchList: async(accessToken:string, movieID:number): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/wants`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({movieID})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  getWatchList: async(accessToken:string): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/wants`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },

      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  deleteFromWatchList: async(accessToken:string, movieID:number): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/wants`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({movieID})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  updateUserInfo: async(accessToken:string, key:string, value:string): Promise<UserInterface> => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`,{
        method:'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({[key]:value})
      })
      return await response.json();
    } catch (e) {
      console.log(e)
      return {id:0, username: '', password:'', email:'',profile_pic:'',createdAt:'', updatedAt:''}
    }
  },
  addToBlackList: async(accessToken:string, movieID:number): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/blacklist`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({movieID})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  getBlackList: async(accessToken:string): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/blacklist`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },

      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  deleteFromBlackList: async(accessToken:string, movieID:number): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/blacklist`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({movieID})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  getOtherUserWantList: async(id:number, accessToken:string): Promise<FavoriteMovieInterface[]> => {
    console.log('i got called')
    try {
      const response = await fetch(`${BASE_URL}/wants`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({id})
      })
      let data = await response.json();
      return data
    }catch(err) {
      console.log(err);
      console.log('it erred here')
      return []
    }
  },
  getOtherUserBlackList: async(id:number, accessToken:string): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/blacklist`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({id})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  getUserRatings: async(accessToken: string): Promise<MovieWithRatingInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/rating`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
      return []
    }
  },
  addRating: async(accessToken: string, movieID: number, rating: number): Promise<MovieWithRatingInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/rating`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ movieID, rating })
      })
      return await response.json();
    } catch (err) {
      console.log(err)
      return []
    }
  },
  removeRating: async(accessToken: string, movieID: number): Promise<MovieWithRatingInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/rating`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ movieID })
      })
      return await response.json();
    } catch (err) {
      console.log(err)
      return []
    }
  },
  getActivities: async(accessToken: string, id?: number): Promise<activityInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/activity`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id: id || "" })
      })
      return await response.json();
    } catch (err) {
      console.log(err)
      return []
    }
  }
}

