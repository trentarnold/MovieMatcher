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
} = require('./Controllers/UserController');

router.put('/user/profile',authMiddleware, updatePictureMiddleware, updateUser);
router.get('/user/profile', authMiddleware, getUser);
router.post('/user/otherUser', authMiddleware, getSpecificUser) // Not for user calls, internal use only!
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


//Movie Controller Routes
// const {
//   getMoviesbyService,
//   getMoviesbyDirector,
//   getMoviesbyCast,
//   getMoviesbyGenre,
//   getMoviesbyPopularity

// } = require('./Controllers/MovieController');

// router.get('/movies/service', getMoviesbyService);
// router.get('/movies/director', getMoviesbyDirector);
// router.get('/movies/cast', getMoviesbyCast);
// router.get('/movies/genre', getMoviesbyGenre);
// router.get('/movies/popular', getMoviesbyPopularity);
//router.get('/movies/castDetails', getCastDetails);

//Action Controller Routes
const {
  getActivity,
//   addRating,
//   getRating,

} = require('./Controllers/ActivityController');

router.post('/activity',authMiddleware, getActivity)
// router.post('/rating', addRating)
// router.get('/rating', getRating)

module.exports = router;