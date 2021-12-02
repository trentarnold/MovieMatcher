import { WatchedMovieAttributes } from "../moviematcherdb/models/watched_movie";
import { RatingAttributes } from "../moviematcherdb/models/rating";
import { WhitelistItemAttributes, WhitelistItemInstance } from "../moviematcherdb/models/whitelist_item";
import { BlacklistItemAttributes } from "../moviematcherdb/models/blacklist_item";

export interface userActivityInterface {
  id: number;
  username: string;
  email: string;
  profile_pic: string;
  createdAt: Date;
  updatedAt: Date;
  watched_movies?: WatchedMovieAttributes[];
  ratings?: RatingAttributes[];
  whitelist?: WhitelistItemAttributes[];
  blacklist?: BlacklistItemAttributes[];
}