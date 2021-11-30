const Movie = require('../Models/')
require('dotenv').config();
const apiKey = process.env.APIKey;
function getMoviesbyService(serviceID) {
  `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=${serviceID}`
}

function getMoviesbyDirector(directorID) {
  `https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people=${directorID}&with_watch_providers=Netflix%2C%20Hulu%2C%20Amazon%2BVideo&with_watch_monetization_types=free`
}

function getMoviesbyCast(castID) {
  `https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=${castID}&with_watch_providers=Netflix%2C%20Hulu%2C%20Amazon%2BVideo&with_watch_monetization_types=free`
}

function getMoviesbyGenre(genreID) {
  `https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=${genreID}`
}

function getMoviesbyPopularity(){
  `https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`
}

module.exports = {
  getMoviesbyService,
  getMoviesbyDirector,
  getMoviesbyCast,
  getMoviesbyGenre,
  getMoviesbyPopularity
}