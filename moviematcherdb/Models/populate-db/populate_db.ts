import { sequelize } from '../index'
import { connectDB } from '../index'
import User from '../user';
import WatchedMovie from '../watched_movie';
import Rating from '../rating';
import Friend from '../friend';
import WhitelistItem from '../whitelist_item';
import BlacklistItem from '../blacklist_item';
import { populateUsers } from './pop-users';
import { populateWatchedMovies } from './pop-watched_movies';
import { populateRatings } from './pop-ratings';
import { populateFriends } from './pop-friends';
import { populateBlacklist } from './pop-blacklist';
import { populateWhitelist } from './pop-whitelist';

(async function callInOrder() {
  await connectDB();
  createData();
})()

async function createData() {
  await sequelize.drop();

  await User.sync();
  await WatchedMovie.sync();
  await Rating.sync();
  await Friend.sync();
  await WhitelistItem.sync();
  await BlacklistItem.sync();

  await populateUsers();
  await populateWatchedMovies();
  await populateRatings();
  await populateFriends();
  await populateBlacklist();
  await populateWhitelist();
}