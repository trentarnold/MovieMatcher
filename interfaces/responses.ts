export interface AccessTokenResponse {
  user:User
  accessToken:string
}

interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    profile_pic: string,
    createdAt: string,
    updatedAt: string
}