import User, { UserInstance, UserAttributes } from '../user';

export async function fetchUserQuery(id: number): Promise<UserInstance | null> {
  return await User.findOne({where: { id: id }});
}

export async function createUserQuery(user: UserAttributes): Promise<UserInstance> {
  return await User.create(user);
}