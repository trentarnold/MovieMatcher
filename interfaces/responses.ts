export interface IAccessTokenResponse {
  user:IUser
  accessToken:string
}


export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string,
    profile_pic: string,
    createdAt: string,
    updatedAt: string
}

export interface IPictureChange {
  data:{
    fileName:string,
    filePath:string
  }
}