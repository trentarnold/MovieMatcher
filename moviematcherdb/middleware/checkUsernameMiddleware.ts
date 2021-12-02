import { searchByUsername } from "../models/queries/userQueries";
import { Response, NextFunction } from 'express';
import { RequestInstance } from './authMiddleware'

export async function checkUsernameMiddleware(req: RequestInstance, res: Response, next: NextFunction) {
  try {
    const { username } = req.body;
    const exists = await searchByUsername(username);
    if (exists) {
      res.status(406).send({message: 'Username already exists, try another'});
    } else {
      next();
    }
  } catch (err) {
    console.log('Error checking username', err);
    res.status(400).send('Error checking username')
  }
}