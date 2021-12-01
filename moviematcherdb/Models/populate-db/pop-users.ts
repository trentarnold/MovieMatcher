import User from "../User"
const bcrypt = require('bcryptjs');

export async function populateUsers() {
  await User.create({
    username: "Sam",
    email: "sam@gmail.com",
    password: bcrypt.hashSync("password", 10),
    profile_pic: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
  })
  await User.create({
    username: "Caleb",
    email: "caleb@gmail.com",
    password: bcrypt.hashSync("password", 10),
    profile_pic: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
  })
  await User.create({
    username: "Trent",
    email: "trent@gmail.com",
    password: bcrypt.hashSync("password", 10),
    profile_pic: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
  })
  await User.create({
    username: "Marshal",
    email: "marshal@gmail.com",
    password: bcrypt.hashSync("password", 10),
    profile_pic: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
  })
}