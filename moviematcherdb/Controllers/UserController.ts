const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
import {Request, Response } from 'express';
import { RequestInstance } from '../middleware/authMiddleware'
import { addFriendQuery, deleteFriendQuery, findAllFriends } from '../models/queries/friendsQueries';
import { createUserQuery, fetchUserQuery, getAllPeopleQuery, searchByUsername, updateUserQuery } from '../models/queries/userQueries';
require('dotenv').config();

async function updateUser (req:RequestInstance,res:Response) {
  try{
    if(req.body && req.user){
    const updatedUser = await updateUserQuery(req.user.id, req.body);
    res.status(201).send(updatedUser);
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
      const specificUser = await fetchUserQuery(req.body.id);
      console.log(specificUser);
      res.status(200).send(specificUser);
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
        res.status(200).send(friends);
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
    const user = await searchByUsername(username);
    if (user != null) {
      return res.status(409).send({ error: '409', message: 'Username in use, please pick another username.' });
    }
    const newUser = await createUserQuery({username, email, password, profile_pic});
    if(newUser){
      const accessToken = jwt.sign({id: newUser.id}, process.env.SECRET_KEY);
      res.status(201).send({ newUser, accessToken})
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
    if(user === null){
       return res.status(409).send({ error: '409' , message: 'Invalid login, please try again.'});
     };
    const validatedUser = await bcrypt.compare(password, user.password);
    if(validatedUser){
      console.log(validatedUser);
      const accessToken = jwt.sign({id: user.id}, process.env.SECRET_KEY);
        res.status(200).send({
         accessToken, user
         })
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
    res.status(201).send(people);
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
     const friend = await addFriendQuery(req.user.id, req.body.friendid)
    if(friend != null){
      res.status(201).send(friend);
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
      const deleted = await deleteFriendQuery(req.user.id, req.body.friendid);
      if(deleted != null){
        res.status(200).send(deleted);
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

async function updatePicture (req: RequestInstance, res: Response) {
  try{ 
    if (req.files === null) {
      return res.status(400).send('No file sent')
    }
    const date = String(Date.now());
    const directory = path.join(__dirname, `../public/`)
      if(req.files) {
        const newImage = req.files.image;
        newImage.mv(directory + date + newImage.name, (e: Error) => { 
        res.status(201).json({fileName: date + newImage.name, filePath:`/${date + newImage.name}`})
        if(e) {
          console.log(e);
          return res.status(500);
        }
      })
     }
  } catch (e) {
    console.log(e);
    res.sendStatus(500)
  }
}
/*
async function addWant (req:RequestInstance,res:Response) {
  try {
    const Want = await addWantQuery(req.body.id);
    if(Want) {
      res.status(201).send('Want added');
    } else {
      res.status(401).send(`Couldn't add want.`)
    }
   }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteWant (req:Request,res:Response) {
  try {
    const { id } = req.body; //need to check this with many-many tables.
    // const want = await db.Wants.findOne({ where: { id: id }});
    // await want.destroy();
    res.status(200).send('Want removed')
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function getWant (req: RequestInstance, res: Response) {
  try {
    if (req.user) {
      const wants = await fetchWhiteList(req.user.id);
      if(wants != null){
      res.status(200).send(wants);
      }
    } else {
      res.status(500).send('Unable to retrieve Want List..')
    }

  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function addBlacklist (req:Request,res:Response){
  try {
    const Want = await addBlacklistQuery(req.body.id);
    if(Want) {
      res.status(201).send('Blacklist added');
    } else {
      res.status(401).send(`Couldn't add Blacklist item.`)
    }
   }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteBlacklist (req:Request,res:Response) {
  try {
    const { id } = req.body; //need to check this with many-many tables.
    // const blackList = await db.Blacklist.findOne({ where: {id: id}});
    // await blackList.destroy();
    res.status(200).send('Blacklist removed');
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function getBlacklist (req: RequestInstance, res: Response) {
  try {
    if (req.user) {
      const Blacklist = await fetchBlackList(req.user.id);
      res.status(200).send(Blacklist);
    } else {
      res.status(500).send('Unable to retrieve Blacklist..')
    }

  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}*/

module.exports = {
  updateUser,
  getUser,
  getFriends,
  createUser,
  loginUser,
  getAllPeople,
  addFriend,
  deleteFriend,
  updatePicture,
  // addWant,
  // deleteWant,
  // getWant,
  // addBlacklist,
  // deleteBlacklist,
  // getBlacklist,
  getSpecificUser
}