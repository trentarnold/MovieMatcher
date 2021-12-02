import {Request, Response} from 'express';
import { recentActivityQuery } from '../models/queries/activityQueries';
import { RequestInstance } from '../middleware/authMiddleware'


async function getActivity (req:RequestInstance,res:Response) {
  try {
    if(req.body && req.user){
    const activity = await recentActivityQuery(req.body.id || req.user.id);
    res.status(200).send(activity);
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function addRating (req:Request,res:Response) {
  try {
    // const newRating = await db.Ratings.create(req.body);
    // if(newRating){
    //   res.status(201).send(newRating);
    // } else {
    //   res.status(400).send(`Couldn't add rating`);
    // }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function getRating (req:Request,res:Response) {
  try {
    const {User, Movie} = req.body;
   // const rating = await db.Rating.findOne({ where: }) //Waiting on DB for search.
  //  if(rating){
  //   res.status(201).send(rating);
  //  } else {
  //    res.status(400).send(`Rating couldn't be found...`)
  //  }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

module.exports = {
  getActivity,
  addRating,
  getRating,

}