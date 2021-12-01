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
   addFriend,
   deleteFriend,
  // addWant,
  // deleteWant,
  // addBlacklist,
  // deleteBlacklist,

} = require('./Controllers/UserController');

router.put('/user/profile',authMiddleware, updateUser);
router.get('/user/profile', authMiddleware, getUser);
 router.get('/user/friends',authMiddleware, getFriends);
 router.post('/user/create', createUser);
 router.post('/user/login', loginUser);
 router.post('/user/friends', authMiddleware, addFriend);
 router.delete('/user/friends', authMiddleware, deleteFriend);
// router.post('/user/wants', addWant);
// router.delete('/user/wants', deleteWant);
// router.post('/user/blacklist', addBlacklist);
// router.delete('/user/blacklist', deleteBlacklist);

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