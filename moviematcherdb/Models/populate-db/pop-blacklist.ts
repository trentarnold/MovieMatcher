import BlacklistItem from "../blacklist_item"

export async function populateBlacklist() {
  await BlacklistItem.create({
    uid: 1,
    movieid: 589761
  })
  await BlacklistItem.create({
    uid: 2,
    movieid: 580489
  })
}