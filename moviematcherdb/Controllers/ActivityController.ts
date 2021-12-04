import {Request, Response} from 'express';
import { recentActivityQuery } from '../models/queries/activityQueries';
import { getRatingsByIDQuery, getRatingsByMovieQuery, addRatingQuery, deleteRatingQuery } from '../models/queries/ratingQuery';
import { RequestInstance } from '../middleware/authMiddleware'
import { userInfo } from 'os';


async function getActivity (req:RequestInstance,res:Response) {
  try {
    if(req.body && req.user){
    const activity = await recentActivityQuery(req.body.id || req.user.id);
    res.status(200).send(activity); //returns array of activities
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function addRating (req:RequestInstance,res:Response) {
  try {
    if(req.user && req.body){
      const ratings = await addRatingQuery(req.user.id, req.body.movieID, req.body.rating);
      res.status(201).send(ratings);
    } else {
      res.status(400).send(`Couldn't add rating`);
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function deleteRating (req:RequestInstance,res:Response) {
  try {
    if(req.user && req.body){
      const ratings = await deleteRatingQuery(req.user.id, req.body.movieID);
      res.status(201).send(ratings);
    } else {
      res.status(400).send(`Couldn't delete rating`);
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function getRatings (req:RequestInstance,res:Response) {
  try {
    if(req.user){
      let ratings;
      if (req.params.movieID) ratings = await getRatingsByMovieQuery(Number(req.params.movieID))
      else ratings = await getRatingsByIDQuery(req.user.id);
      res.status(200).send(ratings);
    } else {
      res.status(400).send(`Ratings couldn't be found for user`)
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

module.exports = {
  getActivity,
  addRating,
  deleteRating,
  getRatings
}