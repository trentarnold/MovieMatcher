import {AccessTokenResponse} from '../../../interfaces/responses'
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
      return {confirmed:false, accessToken:''}
    }
  },
  userLogin: async(username:string, password:string): Promise<AccessTokenResponse> => {
    try {
      const response = await fetch(`${BASE_URL}user/login`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      const {confirmed, accessToken} = await response.json()
      return {confirmed, accessToken};
    } catch (e) {
      console.log(e);
      return {confirmed: false, accessToken:''};
    }
  },

}


