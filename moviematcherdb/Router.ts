const express = require('express');
export const router = express.Router();
import { authMiddleware } from "./middleware/authMiddleware";


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
   updatePicture,

} = require('./Controllers/UserController');

router.put('/user/profile',authMiddleware, updateUser);
router.get('/user/profile', authMiddleware, getUser);
router.get('/user/otherUser', authMiddleware, getSpecificUser) // Not for user calls, internal use only!
router.get('/user/allPeople', authMiddleware, getAllPeople)
router.get('/user/friends',authMiddleware, getFriends);
router.post('/user/create', createUser);
router.post('/user/login', loginUser);
router.post('/user/picture', updatePicture)
router.post('/user/friends', authMiddleware, addFriend);
router.delete('/user/friends', authMiddleware, deleteFriend);
router.post('/user/wants', authMiddleware, addWant);
router.delete('/user/wants', authMiddleware, deleteWant);
router.get('/user/wants', authMiddleware, getWant);
router.post('/user/blacklist', authMiddleware, addBlacklist);
router.delete('/user/blacklist', authMiddleware, deleteBlacklist);
router.get('/user/blacklist', authMiddleware, getBlacklist);

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
// const {
//   addtoActivity,
//   getActivity,
//   addRating,
//   getRating,

// } = require('./Controllers/ActivityController');

// router.post('/activity', addtoActivity)
// router.get('/activity', getActivity)
// router.post('/activity', addRating)
// router.get('/activity', getRating)

module.exports = router;