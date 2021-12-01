import WhitelistItem from "../whitelist_item";

export async function populateWhitelist() {
  await WhitelistItem.create({
    uid: 1,
    movieid: 580489
  })
  await WhitelistItem.create({
    uid: 3,
    movieid: 566525
  })
  await WhitelistItem.create({
    uid: 1,
    movieid: 566525
  })
}