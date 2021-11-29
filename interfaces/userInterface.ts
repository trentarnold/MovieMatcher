import { IListItem } from './listItemInterface';
import { IViewedMovie} from './viewedMovieInterface';

export interface IUser {
  username: String,
  email: String,
  password: String,
  profilePic: String,
  wantList: IListItem[]
  blackList: IListItem[],
  friends: Number[],
  viewHistory: IViewedMovie[]
}