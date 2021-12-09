"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentActivityQuery = void 0;
const userQueries_1 = require("./userQueries");
const friendsQueries_1 = require("./friendsQueries");
function recentActivityQuery(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const date = new Date();
        const weekAgo = new Date(date.setDate(date.getDate() - 7));
        const uglyActivityArr = [];
        const friendsID = yield (0, friendsQueries_1.findAllFriendsID)(id);
        const userActivity = yield (0, userQueries_1.fetchUserActivityQuery)(id, weekAgo);
        if (userActivity !== null)
            uglyActivityArr.push(userActivity);
        if (friendsID !== "no friends") {
            yield Promise.all(friendsID.map((friend) => __awaiter(this, void 0, void 0, function* () {
                const activity = yield (0, userQueries_1.fetchUserActivityQuery)(friend, weekAgo);
                if (activity !== null) {
                    uglyActivityArr.push(activity);
                }
            })));
        }
        const activityArr = [];
        uglyActivityArr.map(item => {
            const { watched_movies, ratings, whitelist, blacklist } = item;
            if (watched_movies && watched_movies.length) {
                for (let movie of watched_movies) {
                    if (movie.dataValues) {
                        movie.dataValues.type = 'watched_movie';
                        activityArr.push(movie.dataValues);
                    }
                }
            }
            if (ratings && ratings.length) {
                for (let rating of ratings) {
                    if (rating.dataValues) {
                        rating.dataValues.type = 'rating';
                        activityArr.push(rating.dataValues);
                    }
                }
            }
            if (whitelist && whitelist.length) {
                for (let listItem of whitelist) {
                    if (listItem.dataValues) {
                        listItem.dataValues.type = 'whitelist';
                        activityArr.push(listItem.dataValues);
                    }
                }
            }
            if (blacklist && blacklist.length) {
                for (let listItem of blacklist) {
                    if (listItem.dataValues) {
                        listItem.dataValues.type = 'blacklist';
                        activityArr.push(listItem.dataValues);
                    }
                }
            }
        });
        activityArr.sort((a, b) => {
            return Number(b.createdAt) - Number(a.createdAt);
        });
        return activityArr;
    });
}
exports.recentActivityQuery = recentActivityQuery;
