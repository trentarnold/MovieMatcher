import { sequelize } from './index'
import { connectDB } from './index'
import User from './user';
import WatchedMovie from './watched_movie';

(async function callInOrder() {
  await connectDB();
  createData()
})()

async function createData() {
  await sequelize.drop();
  await User.sync();
  await WatchedMovie.sync();
  await User.create({
    username: "Test User",
    email: "testuser@gmail.com",
    password: "testpass",
    profile_pic: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
  })
  await User.create({
    username: "Fake User",
    email: "fakeuser@gmail.com",
    password: "fakepass",
    profile_pic: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
  })
  await User.create({
    username: "Stevie",
    email: "st@gmail.com",
    password: "fake",
    profile_pic: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
  })
  
  //create movies
  await WatchedMovie.create({
    uid: 1,
    movieid: 580489,
    friendid: 1,
  })
  await WatchedMovie.create({
    uid: 2,
    movieid: 580489,
    friendid: 3
  })
  await WatchedMovie.create({
    uid: 1,
    movieid: 566525,
    friendid: 3
  })
  await WatchedMovie.create({
    uid: 3,
    movieid: 512195,
    friendid: 2
  })
  await WatchedMovie.create({
    uid: 2,
    movieid: 568124,
    friendid: 1
  })
}