const BASE_URL = 'http://localhost:3001'
interface User {
  username:string,
  email:string,
  password:string,
  profile_pic:string | ArrayBuffer | null
}
interface AccessTokenResponse {
  confirmed:boolean,
  accessToken:string
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

}


