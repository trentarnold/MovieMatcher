const express = require('express');
export const router = express.Router();
import { authMiddleware } from "./middleware/authMiddleware";
import { checkUsernameMiddleware } from "./middleware/checkUsernameMiddleware";
import { setPictureMiddleware, updatePictureMiddleware } from "./middleware/pictureMiddleware";


//User Controller Routes
const {
   updateUser,
   getUser,
   getFriends,
   createUser,
   loginUser,
   getAllPeople,
   addFriend,
   deleteFriend,
   getSpecificUser,
   addWant,
   deleteWant,
   getWant,
   addBlacklist,
   deleteBlacklist,
   getBlacklist,
   getByUsername,
   toggleStreaming
} = require('./Controllers/UserController');

router.put('/user/profile',authMiddleware, updatePictureMiddleware, updateUser);
router.get('/user/profile', authMiddleware, getUser);
router.post('/user/otherUser', authMiddleware, getSpecificUser) // Not for user calls, internal use only!
router.post('/user/getByUsername', authMiddleware, getByUsername) //Only for Socket.IO room. Need to fix if time allows
router.get('/user/allPeople', authMiddleware, getAllPeople)
router.get('/user/friends',authMiddleware, getFriends);
router.post('/user/create', checkUsernameMiddleware, setPictureMiddleware ,createUser);
router.post('/user/login', loginUser);
router.post('/user/friends', authMiddleware, addFriend);
router.delete('/user/friends', authMiddleware, deleteFriend);
router.post('/user/wants', authMiddleware, addWant);
router.delete('/user/wants', authMiddleware, deleteWant);
router.get('/user/wants', authMiddleware, getWant);
router.post('/wants', authMiddleware, getWant);
router.post('/user/blacklist', authMiddleware, addBlacklist);
router.delete('/user/blacklist', authMiddleware, deleteBlacklist);
router.get('/user/blacklist', authMiddleware, getBlacklist);
router.post('/blacklist', authMiddleware, getBlacklist);
router.put('/user/streaming/:streamID', authMiddleware, toggleStreaming);

//Movie Controller Routes
const {
  getWatchedMovie,
  addWatchedMovie,
  movieWatchCount,
  getFileredMovies,
  getPopularMovies,
  getUpcomingMovies,
  getActorsList,
  getStreamProviders,
  getSimilarMovies,
  getActorsDetails,
  getCombinedCredits,
  getIndividualMovie,
  getAllStreamProviders

} = require('./Controllers/MovieController');
router.post('/user/watched', authMiddleware, getWatchedMovie) 
router.post('/user/addWatched', authMiddleware, addWatchedMovie)
router.post('/user/movieCount', authMiddleware, movieWatchCount)
router.post('/movies/APIservice?:params', getFileredMovies )
router.get('/movies/Popular', getPopularMovies);
router.get('/movies/Upcoming', getUpcomingMovies);
router.get('/movies/ActorList?:params', getActorsList);
router.get('/movies/Providers?:params', getStreamProviders);
router.get('/movies/Similar?:params', getSimilarMovies);
router.get('/movies/ActorDetails?:params', getActorsDetails);
router.get('/movies/CombinedCredits?:params', getCombinedCredits);
router.get('/movies/Specific?:params', getIndividualMovie)
router.get('/streamProviders', getAllStreamProviders)

//Action Controller Routes
const {
  getActivity,
  addRating,
  deleteRating,
  getRatings
} = require('./Controllers/ActivityController');

router.post('/activity',authMiddleware, getActivity)
router.post('/rating', authMiddleware, addRating)
router.delete('/rating', authMiddleware, deleteRating)
router.get('/rating/:movieID?', authMiddleware, getRatings) 

module.exports = router;