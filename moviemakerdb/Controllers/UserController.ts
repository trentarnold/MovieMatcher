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

function createUser (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

function loginUser (req, res) {
  try {

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