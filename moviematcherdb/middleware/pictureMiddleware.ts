import { Response, NextFunction } from 'express';
import { RequestInstance } from './authMiddleware'
const path = require('path');

export async function updatePictureMiddleware(req: RequestInstance, res: Response, next: NextFunction) {
  try {
    if (!req.files) {
      if (req.body.profile_pic) {delete req.body.profile_pic}
      next();
    }
    else {
      if (req.user) {
        const newImage = req.files.image;
        const directory = path.join(__dirname, `../public/`);
        newImage.mv(directory + req.user.username + '_profile_picture')
        req.body.profile_pic = `/${req.user.username}_profile_picture`;
        next();
      }
    }
  } catch (err) {
    console.log('Error updating user picture', err);
    res.status(400).send('Error updating user picture')
  }
}

export async function setPictureMiddleware(req: RequestInstance, res: Response, next: NextFunction) {
  try {
    if (!req.files) {
      if (req.body.profile_pic) {delete req.body.profile_pic}
      const generic = '/generic_profile.png';
      req.body.profile_pic = generic;
      next();
    } else {
      if (req.user) {
        const newImage = req.files.image;
        const directory = path.join(__dirname, `../public/`);
        newImage.mv(directory + req.user.username + '_profile_picture')
        req.body.profile_pic = `/${req.user.username}_profile_picture`;
        next();
      }
    }
  } catch (err) {
    console.log('Error setting user picture', err);
    res.status(400).send('Error updating user picture')
  }
}
