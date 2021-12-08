import { RequestInstance } from '../middleware/authMiddleware'
import {Request, Response} from 'express';
import { addWatchedMovieQuery, fetchWatchedMoviesQuery, timesWatchedMovieQuery } from '../models/queries/movieQueries';
import {APIMovieService} from '../Services/APIMovieService';
import { createSemanticDiagnosticsBuilderProgram } from 'typescript';
const axios = require('axios')
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

async function getFileredMovies (req:RequestInstance,res:Response) {
  try{
  let params = '';

  if((req.originalUrl.split('?')[1]) !== undefined) {
    params = '&' + (req.originalUrl.split('?')[1]);
  }
  if(req.body.cast){
    let cast = req.body.cast;
    let castIDStr = '';
    for(let castMember of cast){
    let castID = await APIMovieService.getCastID(`${castMember}`)  //call to get actor/actress id
    castIDStr += castID.toString() + ','
    }
    castIDStr = castIDStr.substring(0, castIDStr.length-1);
    params +=`&with_cast=${castIDStr}`;
  }

  let movies = {};
  if(params !== undefined) {
    movies = await APIMovieService.getFilteredMoviesQuery(params);
  } else {
     movies = await APIMovieService.getMoviesBase();  //base case if no params/cast are passed
  }
  res.status(200).send(movies); // returns arr of Obj
}
catch (err:any) {
  console.log(err.message)
  res.sendStatus(500);
}
}

async function getPopularMovies(req:RequestInstance,res:Response) {
  try{
    const movies = await APIMovieService.getPopularMovies();
    res.status(200).send(movies);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function getUpcomingMovies(req:RequestInstance,res:Response) {
  try{
    const movies = await APIMovieService.getUpcomingMovies();
    res.status(200).send(movies);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function getActorsList(req:RequestInstance,res:Response) {
  try {
    let params;

  if((req.originalUrl.split('=')[1]) !== undefined) {
     params = (req.originalUrl.split('=')[1]);
  }
  params = Number(params);
    const actors =  await APIMovieService.getActorListQuery(params);
    res.status(200).send(actors);

  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function getStreamProviders(req:RequestInstance,res:Response) {
  try {
    let params;

  if((req.originalUrl.split('=')[1]) !== undefined) {
     params = (req.originalUrl.split('=')[1]);
  }
  params = Number(params);
    const Providers = await APIMovieService.getStreamProvidersQuery(params);
    res.status(200).send(Providers);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function getSimilarMovies(req:RequestInstance,res:Response) {
  try {
    let params;

  if((req.originalUrl.split('=')[1]) !== undefined) {
     params = (req.originalUrl.split('=')[1]);
  }
  params = Number(params);
    const movies = await APIMovieService.getSimilarMoviesQuery(params);
    res.status(200).send(movies);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function getActorsDetails(req:RequestInstance,res:Response) {
  try {
    let params;

  if((req.originalUrl.split('=')[1]) !== undefined) {
     params = (req.originalUrl.split('=')[1]);
  }
   const actorId = Number(params);
   const details =await APIMovieService.getActorDetailsQuery(actorId);
    res.status(200).send(details);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function getCombinedCredits(req:RequestInstance,res:Response) {
  try {
    let params;

  if((req.originalUrl.split('=')[1]) !== undefined) {
     params = (req.originalUrl.split('=')[1]);
  }
  params = Number(params);
    const Credits = APIMovieService.getCombinedCreditsQuery(params);
    res.status(200).send(Credits);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }

}

async function getIndividualMovie(req:RequestInstance,res:Response) {
  try {
    let params;

  if((req.originalUrl.split('=')[1]) !== undefined) {
     params = (req.originalUrl.split('=')[1]);
  }
  params = Number(params);
    const Credits = await APIMovieService.getSpecificMovieQuery(params);
    res.status(200).send(Credits);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function getAllStreamProviders(req:Request,res:Response) {
  try{
    const providers = await APIMovieService.getStreamingServiceProviders();
    res.status(200).send(providers);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

module.exports = {
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
}