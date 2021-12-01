import User, { UserInstance, UserAttributes } from '../user';

export async function fetchUserQuery(id: number) {
  return await User.findOne({where: { id: id }}).then((user: any) => {
    const userInstance = user.dataValues;
    return userInstance;
  })
}

export async function searchByUsername(username: string) {
  console.log('hit search by username' + username);
  const user = await User.findOne({where: {username: username}}).then((user: any) => {
    return user ? user.dataValues : null;
  })
  return user;
}

export async function createUserQuery(user: { username: string, email: string, password: string, profile_pic: string }) {
  console.log('hit create user query' + user);
  return await User.create(user).then((user: any) => user.dataValues);
}

export async function updateUserQuery(id: number, fields:{ username?: string, email?: string, password?: string, profile_pic?: string }) {
  return await User.update(fields, {where: {id: id}}).then((user: any) => user.dataValues);
}
