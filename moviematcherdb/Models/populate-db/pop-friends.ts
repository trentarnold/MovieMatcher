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
  await Friend.create({
    uid: 1,
    friendid: 4
  })
  await Friend.create({
    uid: 2,
    friendid: 3
  })
  await Friend.create({
    uid: 2,
    friendid: 4
  })
  await Friend.create({
    uid: 3,
    friendid: 4
  })
}