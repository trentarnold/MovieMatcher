import Friend from "../friend";
import { fetchUserQuery } from "./userQueries";
import { Op } from 'sequelize';
import { connectDB } from "../index";

export async function findAllFriends(id: number) {
  const friendIDArr: [number] = [id];
  const userFriends = await Friend.findAll({where: {uid: id}})
  const friendUsers = await Friend.findAll({where: {friendid: id}})
  userFriends.map(friend => {
    if (friend.dataValues) friendIDArr.push(friend.dataValues.friendid)
  })
  friendUsers.map(friend => {
    if (friend.dataValues) friendIDArr.push(friend.dataValues.uid)
  })
  if (friendIDArr.length === 1) return null

  friendIDArr.shift();
  const uniqueSet = new Set(friendIDArr);
  const uniqueArr = [...uniqueSet];
  
  // query user data for each friend
  return Promise.all(uniqueArr.map((num: number) => {
    return fetchUserQuery(num);
  }))
}

async function friendExists(id: number, friendID: number) {
  const exists = await Friend.findOne({where: { [Op.or]:[ { [Op.and]: [{uid: id}, {friendid: friendID}] }, { [Op.and]: [{uid: friendID}, {friendid: id}] } ] }})
  return exists ? exists.dataValues : false;
}

export async function addFriendQuery(id: number, friendID: number) {
  const exists = await friendExists(id, friendID);
  if (exists) return null
  else {
    await Friend.create({uid: id, friendid: friendID})
    return await findAllFriends(id);
  }
}

export async function deleteFriendQuery(id: number, friendID: number) {
  const exists = await friendExists(id, friendID);
  if (!exists) return null
  else {
    const userID = exists.uid;
    const friend = exists.friendid;
    await Friend.destroy({where: {uid: userID, friendid: friend}})
    return await findAllFriends(id);
  }
}
