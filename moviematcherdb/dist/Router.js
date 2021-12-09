"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require('express');
exports.router = express.Router();
const authMiddleware_1 = require("./middleware/authMiddleware");
const checkUsernameMiddleware_1 = require("./middleware/checkUsernameMiddleware");
const pictureMiddleware_1 = require("./middleware/pictureMiddleware");
//User Controller Routes
const { updateUser, getUser, getFriends, createUser, loginUser, getAllPeople, addFriend, deleteFriend, getSpecificUser, addWant, deleteWant, getWant, addBlacklist, deleteBlacklist, getBlacklist, getByUsername, toggleStreaming } = require('./Controllers/UserController');
exports.router.put('/user/profile', authMiddleware_1.authMiddleware, pictureMiddleware_1.updatePictureMiddleware, updateUser);
exports.router.get('/user/profile', authMiddleware_1.authMiddleware, getUser);
exports.router.post('/user/otherUser', authMiddleware_1.authMiddleware, getSpecificUser); // Not for user calls, internal use only!
exports.router.post('/user/getByUsername', authMiddleware_1.authMiddleware, getByUsername); //Only for Socket.IO room. Need to fix if time allows
exports.router.get('/user/allPeople', authMiddleware_1.authMiddleware, getAllPeople);
exports.router.get('/user/friends', authMiddleware_1.authMiddleware, getFriends);
exports.router.post('/user/create', checkUsernameMiddleware_1.checkUsernameMiddleware, pictureMiddleware_1.setPictureMiddleware, createUser);
exports.router.post('/user/login', loginUser);
exports.router.post('/user/friends', authMiddleware_1.authMiddleware, addFriend);
exports.router.delete('/user/friends', authMiddleware_1.authMiddleware, deleteFriend);
exports.router.post('/user/wants', authMiddleware_1.authMiddleware, addWant);
exports.router.delete('/user/wants', authMiddleware_1.authMiddleware, deleteWant);
exports.router.get('/user/wants', authMiddleware_1.authMiddleware, getWant);
exports.router.post('/wants', authMiddleware_1.authMiddleware, getWant);
exports.router.post('/user/blacklist', authMiddleware_1.authMiddleware, addBlacklist);
exports.router.delete('/user/blacklist', authMiddleware_1.authMiddleware, deleteBlacklist);
exports.router.get('/user/blacklist', authMiddleware_1.authMiddleware, getBlacklist);
exports.router.post('/blacklist', authMiddleware_1.authMiddleware, getBlacklist);
exports.router.put('/user/streaming/:streamID', authMiddleware_1.authMiddleware, toggleStreaming);
//Movie Controller Routes
const { getWatchedMovie, addWatchedMovie, movieWatchCount, getFileredMovies, getPopularMovies, getUpcomingMovies, getActorsList, getStreamProviders, getSimilarMovies, getActorsDetails, getCombinedCredits, getIndividualMovie, getAllStreamProviders } = require('./Controllers/MovieController');
exports.router.post('/user/watched', authMiddleware_1.authMiddleware, getWatchedMovie);
exports.router.post('/user/addWatched', authMiddleware_1.authMiddleware, addWatchedMovie);
exports.router.post('/user/movieCount', authMiddleware_1.authMiddleware, movieWatchCount);
exports.router.post('/movies/APIservice?:params', getFileredMovies);
exports.router.get('/movies/Popular', getPopularMovies);
exports.router.get('/movies/Upcoming', getUpcomingMovies);
exports.router.get('/movies/ActorList?:params', getActorsList);
exports.router.get('/movies/Providers?:params', getStreamProviders);
exports.router.get('/movies/Similar?:params', getSimilarMovies);
exports.router.get('/movies/ActorDetails?:params', getActorsDetails);
exports.router.get('/movies/CombinedCredits?:params', getCombinedCredits);
exports.router.get('/movies/Specific?:params', getIndividualMovie);
exports.router.get('/streamProviders', getAllStreamProviders);
//Action Controller Routes
const { getActivity, addRating, deleteRating, getRatings } = require('./Controllers/ActivityController');
exports.router.post('/activity', authMiddleware_1.authMiddleware, getActivity);
exports.router.post('/rating', authMiddleware_1.authMiddleware, addRating);
exports.router.delete('/rating', authMiddleware_1.authMiddleware, deleteRating);
exports.router.get('/rating/:movieID?', authMiddleware_1.authMiddleware, getRatings);
module.exports = exports.router;
