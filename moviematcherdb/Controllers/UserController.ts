const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import {Request, Response } from 'express';
import { RequestInstance } from '../middleware/authMiddleware'
import { findAllFriends } from '../models/queries/friendsQueries';
import { createUserQuery, searchByUsername, updateUserQuery } from '../models/queries/userQueries';
require('dotenv').config();

// async function updateUser (req:Request,res:Response) {
//   try{
//     const { username, value, newValue }  =req.body;
//     await updateUserQuery(req.user.id, req.body);
//     res.status(201).send('User updated');
//   }
//   catch (err:any){
//     console.log(err.message)
//     res.sendStatus(500);
//   }
// }

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

export async function getFriends (req:Request,res:Response) {
  try{
    const {User} = req.body;
    const friends = await findAllFriends(User.id);
    if(friends === null){
      res.status(200).send('User has no friends. Loser.')
    } else{
      res.status(200).send();
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
      res.status(201).send({ confirmed: true, accessToken})
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
      const accessToken = jwt.sign({id: user.id}, process.env.SECRET_KEY);
        res.status(200).send({
          confirmed: true, accessToken
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

async function addFriend (req:Request,res:Response) {
  try {
    // const friend = await db.Friends.create(req.body)
    // if(friend){
    //   res.status(201).send('Friend added!');
    // } else {
    //   res.status(401).send(`Friend could not be added.`);
    // }
  }
  catch (err:any){
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteFriend (req:Request,res:Response) {
  try {
    const {id} = req.body;
    // const friend =  await db.Friends.findOne({ where: {id: id}});
    // await friend.destroy();
    res.status(200).send('Friend removed.');
  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function addWant (req:Request,res:Response) {
  try {
  //   const Want = await db.Wants.create(req.body);
  //   if(Want) {
  //     res.status(201).send('Want added');
  //   } else {
  //     res.status(401).send(`Couldn't add want.`)
  //   }
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

async function addBlacklist (req:Request,res:Response){
  try {
    // const newBlacklist = await db.Blacklist.create(req.body);
    // if(newBlacklist) {
    //   res.status(201).send('Blacklist added');
    // } else {
    //   res.status(401).send(`Couldn't add blacklist.`)
    // }
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

function updateProfilePic (req:Request,res:Response) {
  try {

  }
  catch (err:any) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

module.exports = {
 // updateUser,
  getUser,
  getFriends,
  createUser,
  loginUser,
  addFriend,
  deleteFriend,
  addWant,
  deleteWant,
  addBlacklist,
  deleteBlacklist,
  updateProfilePic
}