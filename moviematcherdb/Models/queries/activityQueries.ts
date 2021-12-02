import { fetchUserActivityQuery } from './userQueries';
import { findAllFriendsID } from './friendsQueries';
import { WatchedMovieAttributes } from '../watched_movie';
import { RatingAttributes } from '../rating';
import { WhitelistItemAttributes } from '../whitelist_item';
import { BlacklistItemAttributes, BlacklistItemInstance } from '../blacklist_item';

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
  const activityArr: (WatchedMovieAttributes | RatingAttributes | WhitelistItemAttributes | BlacklistItemAttributes)[] = []
  uglyActivityArr.map(item => {
      const { watched_movies, ratings, whitelist, blacklist } = item;
      if (watched_movies && watched_movies.length) {
        for (let movie of watched_movies) {
          if (movie.dataValues) {
            movie.dataValues.type = 'watched_movie';
            activityArr.push(movie.dataValues)
          }
        }
      }
      if (ratings && ratings.length) {
        for (let rating of ratings) {
          if (rating.dataValues) {
            rating.dataValues.type = 'rating';
            activityArr.push(rating.dataValues)
          }
        }
      }
      if (whitelist && whitelist.length) {
        for (let listItem of whitelist) {
          if (listItem.dataValues) {
            listItem.dataValues.type = 'whitelist';
            activityArr.push(listItem.dataValues)
          }
        }
      }
      if (blacklist && blacklist.length) {
        for (let listItem of blacklist) {
          if (listItem.dataValues) {
            listItem.dataValues.type = 'blacklist';
            activityArr.push(listItem.dataValues)
          }
        }
      }
    })
    activityArr.sort((a, b) => {
      return Number(b.createdAt) - Number(a.createdAt);
    })
  return activityArr;
}

