import User, { UserAttributes } from '../User';

//NEED TO STOP RETURNING PASSWORDS


export async function fetchUserQuery(id: number): Promise<UserAttributes | null> {
  const user = await User.findOne({where: { id: id }, attributes: ['id', 'username', 'email', 'profile_pic', 'createdAt', 'updatedAt']});
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
  // return userRes && userRes.dataValues ? userRes.dataValues : null;
}

export async function updateUserQuery(id: number, fields:{ username?: string, email?: string, password?: string, profile_pic?: string }): Promise<UserAttributes | null> {
  await User.update(fields, {where: {id: id}});
  return await fetchUserQuery(id);
}
