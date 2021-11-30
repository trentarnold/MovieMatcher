import User from "../user"

export async function populateUsers() {
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
}