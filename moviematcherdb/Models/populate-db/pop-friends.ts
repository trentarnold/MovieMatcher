import Friend from '../friend';

export async function populateFriends() {
  await Friend.create({
    uid: 1,
    friendid: 2
  })
  await Friend.create({
    uid: 1,
    friendid: 3
  })
}