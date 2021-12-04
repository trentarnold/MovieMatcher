import { RequestInstance } from '../middleware/authMiddleware'
import {Request, Response} from 'express';
import { addWatchedMovieQuery, fetchWatchedMoviesQuery, timesWatchedMovieQuery } from '../models/queries/movieQueries';

require('dotenv').config();

async function getWatchedMovie (req:RequestInstance,res:Response) {
  try {
    if(req.user && req.body) {
      const watchedMovies = await fetchWatchedMoviesQuery(req.body.id || req.user.id);
      if(watchedMovies === 'no movies'){
        res.status(200).send('User has not added any watched movies.')
      }
      res.status(200).send(watchedMovies); // returns all watched movies
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function addWatchedMovie (req:RequestInstance,res:Response) {
  try {
    if(req.user && req.body){
      if(!req.body.friendID) req.body.friendID = 0;
      if(!req.body.createdDate) req.body.createdDate = new Date (Date.now());
      const movie = await addWatchedMovieQuery(req.user.id, req.body.movieID, req.body.friendID, req.body.createdDate)
      res.status(200).send(movie); //returns movies watched with new movie added
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function movieWatchCount (req:RequestInstance,res:Response) {
  try {
    if(req.user && req.body){
      const count = await timesWatchedMovieQuery(req.user.id, req.body.movieID)
      const countstr = count.toString();
      res.status(200).send(countstr); //returns string of num of times movie was watched
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}
module.exports = {
  getWatchedMovie,
  addWatchedMovie,
  movieWatchCount
}