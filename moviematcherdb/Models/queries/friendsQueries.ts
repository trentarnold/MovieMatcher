import Friend from "../friend";
import { connectDB } from "../index";
import { fetchUserQuery } from "./userQueries";

export async function findAllFriends(id: number) {
  const friendIDArr: [number] = [id];
  const userFriends = await Friend.findAll({where: {uid: id}})
  const friendUsers = await Friend.findAll({where: {friendid: id}})
  userFriends.map((friend: any) => friendIDArr.push(friend.dataValues.friendid))
  friendUsers.map((friend: any) => friendIDArr.push(friend.dataValues.uid))
  if (friendIDArr.length === 1) return null

  friendIDArr.shift();
  const uniqueSet = new Set(friendIDArr);
  const uniqueArr = [...uniqueSet];

  return uniqueArr;
  
  // query user data for each friend
  return uniqueArr.map(async (num: number) => {
    const user = await fetchUserQuery(num);
    return user.dataValues;
  })
}

async function run() {
  await connectDB();
  console.log(await findAllFriends(1));
}

run();