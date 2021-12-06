export interface AccessTokenResponse {
  user:User
  accessToken:string
}


export interface  User {
    id: number,
    username: string,
    email: string,
    password: string,
    profile_pic: string,
    createdAt: string,
    updatedAt: string
}

export interface PictureChange {
  data:{
    fileName:string,
    filePath:string
  }
}