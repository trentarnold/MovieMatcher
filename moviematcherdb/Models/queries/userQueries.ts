import User, { UserInstance, UserAttributes } from '../user';

async function fetchUser(id: number): Promise<UserInstance | null> {
  return await User.findOne({where: { id: id }});
}

async function createUser(user: UserAttributes): Promise<UserInstance> {
  return await User.create(user);
}