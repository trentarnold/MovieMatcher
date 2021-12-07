import User, { UserAttributes, UserInstance } from '../User';
import { Op } from 'sequelize';
import { sequelize } from '../index';



export async function fetchUserQuery(id: number): Promise<UserAttributes | null> {
  const user = await User.findOne({where: { id: id }, attributes: ['id', 'username', 'email', 'profile_pic', 'streaming', 'createdAt', 'updatedAt']});
  return user && user.dataValues ? user.dataValues : null;
}

export async function fetchUserActivityQuery(id: number, date: Date) {
  const user = await User.findOne({
    where: { id: id, createdAt: { [Op.gte]: date } }, 
    attributes: ['id', 'username', 'email', 'profile_pic', 'createdAt', 'updatedAt'],
    include:["watched_movies", "ratings", "whitelist", "blacklist"]
  });
  return user && user.dataValues ? user.dataValues : null;
}

export async function getAllPeopleQuery() {
  const Users = await User.findAll({attributes: ['id', 'username', 'email', 'profile_pic', 'createdAt', 'updatedAt']});
  return Users;
}

export async function searchByUsername(username: string): Promise<UserAttributes | null> {
  const user = await User.findOne({where: {username: username}})
  return user && user.dataValues ? user.dataValues : null;
}

export async function createUserQuery(user: { username: string, email: string, password: string, profile_pic: string }): Promise<UserAttributes | null> {
  const userRes = await User.create(user);
  return await fetchUserQuery(userRes.id);
}

export async function updateUserQuery(id: number, fields:{ username?: string, email?: string, password?: string, profile_pic?: string }): Promise<UserAttributes | null> {
  await User.update(fields, {where: {id: id}});
  return await fetchUserQuery(id);
}

export async function toggleStreamingService(id: number, streamID: number) {
  const services = await User.findOne({ where: { id }, attributes: ['streaming']});
  if (services?.dataValues?.streaming?.includes(streamID)) {
    console.log('delete')
    await deleteStreamingService(id, streamID);
  } else {
    console.log('add')
    await addStreamingService(id, streamID);
  }
  const res = await User.findOne({ where: { id }, attributes: ['streaming']})
  return res?.dataValues;
}

async function addStreamingService(id: number, streamID: number) {
  await sequelize.query(`UPDATE users SET streaming=array_append(streaming, '${streamID}') where id=${id};`)
} 

async function deleteStreamingService(id: number, streamID: number) {
  await sequelize.query(`UPDATE users SET streaming=array_remove(streaming, '${streamID}') where id=${id};`)
}
