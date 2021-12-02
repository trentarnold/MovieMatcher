const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
import {Request, Response } from 'express';
import { RequestInstance } from '../middleware/authMiddleware'
import { addFriendQuery, deleteFriendQuery, findAllFriends } from '../models/queries/friendsQueries';
import { createUserQuery, fetchUserQuery, getAllPeopleQuery, searchByUsername, updateUserQuery } from '../models/queries/userQueries';
import {addWhitelistQuery, fetchWhitelistQuery, deleteWhitelistQuery,fetchBlacklistQuery, addBlacklistQuery, deleteBlacklistQuery } from '../models/queries/listQueries'
require('dotenv').config();

async function updateUser (req:RequestInstance,res:Response) {
  try{
    if(req.body && req.user){
    const user = await updateUserQuery(req.user.id, req.body);
    res.status(201).send(user); // returns the user after update
    } else {
      res.status(401).send('User could not be updated.')
    }
  }
  catch (err:any){
    console.log(err.message)
    res.sendStatus(500);
  }
}

export async function getUser (req:RequestInstance, res:Response) {
  try {
    if (req.user) {
      res.status(200).send(req.user)
    } else {
      res.status(500).send({message: "User not authorized"})
    }

  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}
export async function getSpecificUser (req:Request, res:Response) {
  try {
    if (req.body) {
      const user = await fetchUserQuery(req.body.id);
      res.status(200).send(user);  //returns the queried user
    } else {
      res.status(500).send({message: "User not found"})
    }

  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}
export async function getFriends (req:RequestInstance,res:Response) {
  try{
    const {User} = req.body;
    if(req.user) {
      const friends = await findAllFriends(req.user.id);
      if(friends === null){
        res.status(200).send('User has no friends. Loser.')
      } else{
        res.status(200).send(friends); //returns friends list
      }
    }
  }
  catch (err:any){
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function createUser (req:Request,res:Response) {
  try {
    let {username, email, password, profile_pic} = req.body;
     const hash = await bcrypt.hash(password, 10);
     password = hash;
    const Existinguser = await searchByUsername(username);
    if (Existinguser != null) {
      return res.status(409).send({ error: '409', message: 'Username in use, please pick another username.' });
    }
    const user = await createUserQuery({username, email, password, profile_pic});
    if(user){
      const accessToken = jwt.sign({id: user.id}, process.env.SECRET_KEY);
      res.status(201).send({ user, accessToken}) //returns the created user and their JWT
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function loginUser (req:Request,res:Response) { //needs work
  try {
    const { username, password } = req.body;
    const user = await searchByUsername(username);
    console.log(user)
    if(user === null){
       return res.status(409).send({ error: '409' , message: 'Invalid login, please try again.'});
     };
    const validatedUser = await bcrypt.compare(password, user.password);
    if(validatedUser){
      console.log(validatedUser);
      const accessToken = jwt.sign({id: user.id}, process.env.SECRET_KEY);
        res.status(200).send({accessToken, user}) //returns the user that logged in and their JWT
    }
    else{
      res.status(400).send({confirmed: false});
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function getAllPeople (req: Request, res: Response){
  try{
    const people = await getAllPeopleQuery();
    res.status(201).send(people); //returns all users
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function addFriend (req:RequestInstance,res:Response) {
  try {
      if(req.body && req.user){
        if(req.user.id === req.body.friendid) return res.status(401).send(`Can't add yourself as a friend.`)
     const user = await addFriendQuery(req.user.id, req.body.friendid)
    if(user != null){
      res.status(201).send(user); // returns updated friends list
    } else {
      res.status(401).send(`Friend could not be added.`);
    }
    }
  }
  catch (err:any){
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteFriend (req:RequestInstance,res:Response) {
  try {
    if(req.body&&req.user){
      if(req.user.id === req.body.friendid) return res.status(401).send(`Can't delete yourself as a friend.`)
      const remaining = await deleteFriendQuery(req.user.id, req.body.friendid);
      if(remaining != null){
        res.status(200).send(remaining); // returns remaining friends
      } else {
        res.status(401).send('Friend could not be deleted');
      }
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function addWant (req:RequestInstance,res:Response) {
  try {
    if(req.body && req.user) {
      const Want = await addWhitelistQuery(req.user.id, req.body.movieID);
      if(Want === 'already exists'){
        res.status(201).send('Movie is already on Want list.')
      } else{
        res.status(201).send(Want); //Returns Want list with new movie added
    }
   }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteWant (req:RequestInstance,res:Response) {
  try {
    if(req.body && req.user){
    const deleted = await deleteWhitelistQuery(req.user.id, req.body.movieID);
      if(deleted === 'does not exist'){
        res.status(201).send('Movie is not in Want list.');
      } else {
        res.status(201).send(deleted); //returns want list after removing movie
      }
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function getWant (req: RequestInstance, res: Response) {
  try {
    if (req.user) {
      const wantlist = await fetchWhitelistQuery(req.user.id);
      if(wantlist === 'no whitelist'){
      res.status(200).send('User does not have any movie on their Want list');
      } else {
        res.status(201).send(wantlist); //sends want list
      }
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function addBlacklist (req:RequestInstance,res:Response){
  try {
    if(req.body && req.user) {
      const Blacklistitem = await addBlacklistQuery(req.user.id, req.body.movieID);
      if(Blacklistitem === 'already exists'){
        res.status(201).send('Movie is already on Blacklist.')
      } else{
        res.status(201).send(Blacklistitem); //Returns Blacklist with new movie added
    }
   }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteBlacklist (req:RequestInstance,res:Response) {
  try {
    if(req.body && req.user){
      const deleted = await deleteBlacklistQuery(req.user.id, req.body.movieID);
        if(deleted === 'does not exist'){
          res.status(201).send('Movie is not in Blacklist.');
        } else {
          res.status(201).send(deleted); //returns Blacklist after removing movie
        }
      }
    }
    catch (err:any) {
      console.log(err.message)
      res.sendStatus(500)
    }
}

async function getBlacklist (req: RequestInstance, res: Response) {
  try {
    if (req.user) {
      const Blacklist = await fetchBlacklistQuery(req.user.id);
      if(Blacklist === 'no blacklist'){
      res.status(200).send('User does not have any movie on their Blacklist');
      } else {
        res.status(201).send(Blacklist); //sends Blacklist
      }
    }
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }

}

async function updatePicture (req: RequestInstance, res: Response) {
  try{
    if (req.files === null) {
      return res.status(400).send('No file sent');
    }
    const date = String(Date.now());
    const directory = path.join(__dirname, `../public/`);
      if(req.files) {
        const newImage = req.files.image;
        newImage.mv(directory + date + newImage.name, (e: Error) => {
        res.status(201).json({fileName: date + newImage.name, filePath:`/${date + newImage.name}`});
        if(e) {
          console.log(e);
          return res.status(500);
        }
      })
     }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  updateUser,
  getUser,
  getFriends,
  createUser,
  loginUser,
  getAllPeople,
  addFriend,
  deleteFriend,
  addWant,
  deleteWant,
  getWant,
  addBlacklist,
  deleteBlacklist,
  getBlacklist,
  getSpecificUser,
  updatePicture,
}