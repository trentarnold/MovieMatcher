const User = require('../../interfaces/userInterface');

function updateUser (req, res) {
  try{
    User.save(req.body);
    res.status(201);
    res.send('User Updated');
  }
  catch (err){
    console.log(err.message)
    res.sendStatus(500);
  }
}

function getUser (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

function getFriends (req, res) {
  try{

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
    const user = await deleteBlacklist.User.findOne({ where: { username: username}});
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
    const user = await deleteBlacklist.User.findOne({where: { username: `${username}`}});
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

function addFriend (req, res) {
  try {

  }
  catch (err){
    console.log(err.message)
    res.sendStatus(500)
  }
}

function deleteFriend (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

function findFriends (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

function addWant (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

function deleteWant (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

function addBlacklist (req, res){
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

function deleteBlacklist (req, res) {
  try {

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
  findFriends,
  addWant,
  deleteWant,
  addBlacklist,
  deleteBlacklist,
  updateProfilePic
}