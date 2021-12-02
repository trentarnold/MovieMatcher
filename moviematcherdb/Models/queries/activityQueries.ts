import { fetchUserActivityQuery } from './userQueries';
import { findAllFriendsID } from './friendsQueries';
import { userActivityInterface } from '../../../interfaces/activityQueryInterface';
import { WatchedMovieAttributes } from '../watched_movie';
import { RatingAttributes } from '../rating';
import { WhitelistItemAttributes } from '../whitelist_item';
import { BlacklistItemAttributes } from '../blacklist_item';

import { connectDB } from "../index";

export async function recentActivityQuery(id: number) {
  const date = new Date();
  const weekAgo = new Date(date.setDate(date.getDate() - 7));
  const uglyActivityArr = [];
  const friendsID = await findAllFriendsID(id);
  const userActivity = await fetchUserActivityQuery(id, weekAgo);
  if (userActivity !== null) uglyActivityArr.push(userActivity)
  if (friendsID !== "no friends") {
    await Promise.all(
      friendsID.map(async friend => {
        const activity = await fetchUserActivityQuery(friend, weekAgo);
        if (activity !== null) {
          uglyActivityArr.push(activity)
        }
      })
    )
  }

  const activityArr: userActivityInterface[] = [];
  uglyActivityArr.map(item => {
    const { watched_movies, ratings, whitelist, blacklist } = item;
    if (item.createdAt && item.updatedAt) {
      var { id, username, email, profile_pic, createdAt, updatedAt } = item
    }
    let userItem: userActivityInterface = { id, username, email, profile_pic, createdAt, updatedAt }
    if (watched_movies && watched_movies.length) {
      const movies: WatchedMovieAttributes[] = [];
      for (let movie of watched_movies) {
        if (movie.dataValues) movies.push(movie.dataValues)
      }
      userItem.watched_movies = movies;
    }
    if (ratings && ratings.length) {
      const ratingsArr: RatingAttributes[] = [];
      for (let rating of ratings) {
        if (rating.dataValues) ratingsArr.push(rating.dataValues)
      }
      userItem.ratings = ratingsArr;
    }
    if (whitelist && whitelist.length) {
      const whitelistArr: WhitelistItemAttributes[] = [];
      for (let listItem of whitelist) {
        if (listItem.dataValues) whitelistArr.push(listItem.dataValues)
      }
      userItem.whitelist = whitelistArr;
    }
    if (blacklist && blacklist.length) {
      const blacklistArr: BlacklistItemAttributes[] = [];
      for (let listItem of blacklist) {
        if (listItem.dataValues) blacklistArr.push(listItem.dataValues)
      }
      userItem.blacklist = blacklistArr;
    }
    activityArr.push(userItem);
    console.log(userItem)
  })
  return activityArr
}

async function run() {
  await connectDB()
  // console.log(await findAllFriendsID(1))
  console.log(await recentActivityQuery(1), 'func')
}

run()
