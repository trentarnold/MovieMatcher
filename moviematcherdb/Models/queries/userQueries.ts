import User, { UserInstance, UserAttributes } from '../user';

export async function fetchUserQuery(id: number) {
  return await User.findOne({where: { id: id }}).then((user: any) => {
    const userInstance = user.dataValues;
    return userInstance;
  })
}

export async function createUserQuery(user: UserAttributes): Promise<UserInstance> {
  return await User.create(user);
}


