import { IListItem } from './listItemInterface';
import { IViewedMovie} from './viewedMovieInterface';

export interface IUser {
  username: string,
  email: string,
  password: string,
  profilePic: string,
  wantList: IListItem[]
  blackList: IListItem[],
  friends: Number[],
  viewHistory: IViewedMovie[]
}

export interface IProfileInfo {
  id: number,
  username: string,
  email: string,
  profile_pic: string,
  createdAt: string,
  updatedAt: string,
}