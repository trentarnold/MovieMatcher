const router = require('express').Router();



//User Controller Routes
const {
  updateUser,
  getUser,
  getFriends,
  createUser,
  loginUser,
  addFriend,
  deleteFriend,
  findFriends,
  addWant,
  deleteWant,
  addBlacklist,
  deleteBlacklist,
  updateProfilePic
} = require('./Controllers/UserController');

router.put('/user/profile/:type/:add', updateUser);
router.get('/user/profile', getUser);
router.get('/user/friends', getFriends);
router.post('/user/create', createUser);
router.post('/user/login', loginUser);
router.put('/user/friends', addFriend);
router.delete('/user/friends', deleteFriend);
router.get('/user/friends', findFriends);
router.post('/user/wants', addWant);
router.delete('/user/wants', deleteWant);
router.post('/user/blacklist', addBlacklist);
router.delete('/user/blacklist', deleteBlacklist);
router.put('/user/profile', updateProfilePic);

//Movie Controller Routes
const {
  getMoviesbyService,
  getMoviesbyDirector,
  getMoviesbyCast,
  getMoviesbyGenre,
  getMoviesbyPopularity

} = require('./Controllers/MovieController');

router.get('/movies/service', getMoviesbyService);
router.get('/movies/director', getMoviesbyDirector);
router.get('/movies/cast', getMoviesbyCast);
router.get('/movies/genre', getMoviesbyGenre);
router.get('/movies/popular', getMoviesbyPopularity);

//Action Controller Routes
const {
  addtoActivity,
  getActivity,
  addRating,
  getRating,

} = require('./Controllers/ActionsController');

router.post('/activity', addtoActivity)
router.get('/activity', getActivity)
router.post('/activity', addRating)
router.get('/activity', getRating)
