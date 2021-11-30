const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function updateUser (req, res) {
  try{
    const { username, value, newValue }  =req.body;
    await db.User.findOne({ where: {username: username}}).then(user => {
      user.update({ [value]: newValue });
    })
    res.status(201).send('User updated');
  }
  catch (err){
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function getUser (req, res) {
  try {
    const { username } = req.body;
    const match = await db.User.findOne({ where: { username: username } });
    res.status(200).send(match);
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function getFriends (req, res) {
  try{
    const {User} = req.body;
    //const friends = await db.Friends.findAll( { where: }) waiting on DB info to complete search
    res.status(200).send(JSON.stringify(friends));
  }
  catch (err){
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function createUser (req, res) {
  try {
    const {username, email, password} = req.body;
    const hash = await bcrypt.hast(password, 10);
    const user = await db.User.findOne({ where: { username: username}});
    if(user) return res.status(409).send({ error: '409', message: 'Username in use, please pick another username.' });
    const newUser = await db.User.create({
      username,
      email,
      password //need to update with db schema
    });
    if(newUser){
      const accessToken = jwt.sign({_id: newUser.id}, SECRET_KEY);
      res.status(201).send({ confirmed: true, accessToken})
    }
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function loginUser (req, res) {
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({where: { username: `${username}`}});
    if(!user){
      return res.status(409).send({ error: '409' , message: 'Invalid login, please try again.'});
    };
    /*const validatedUser = await bcrypt.compare(password, user.password);
    if(validatedUser){
      //const accessToken = jwt.sign({_id: user.id}, SECRET_KEY);
        res.status(200).send({
         db fields here
         })
    }
    else{
      res.status(400).send({confirmed: false)}*/
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function addFriend (req, res) {
  try {
    const friend = await db.Friends.create(req.body)
    if(friend){
      res.status(201).send('Friend added!');
    } else {
      res.status(401).send(`Friend could not be added.`);
    }
  }
  catch (err){
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteFriend (req, res) {
  try {
    const {id} = req.body;
    const friend =  await db.Friends.findOne({ where: {id: id}});
    await friend.destroy();
    res.status(200).send('Friend removed.');
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function addWant (req, res) {
  try {
    const Want = await db.Wants.create(req.body);
    if(Want) {
      res.status(201).send('Want added');
    } else {
      res.status(401).send(`Couldn't add want.`)
    }
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteWant (req, res) {
  try {
    const { id } = req.body; //need to check this with many-many tables.
    const want = await db.Wants.findOne({ where: { id: id }});
    await want.destroy();
    res.status(200).send('Want removed')
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function addBlacklist (req, res){
  try {
    const newBlacklist = await db.Blacklist.create(req.body);
    if(newBlacklist) {
      res.status(201).send('Blacklist added');
    } else {
      res.status(401).send(`Couldn't add blacklist.`)
    }
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

async function deleteBlacklist (req, res) {
  try {
    const { id } = req.body; //need to check this with many-many tables.
    const blackList = await db.Blacklist.findOne({ where: {id: id}});
    await blackList.destroy();
    res.status(200).send('Blacklist removed');
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

function updateProfilePic (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

module.exports = {
  updateUser,
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