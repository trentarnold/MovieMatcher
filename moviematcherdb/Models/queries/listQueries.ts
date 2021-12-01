import WhitelistItem, { WhitelistItemAttributes, WhitelistItemInstance } from "../whitelist_item";
import BlacklistItem, { BlacklistItemAttributes } from "../blacklist_item";

// helper
async function checkWhitelist(id: number, movieID: number): Promise<WhitelistItemAttributes | boolean> {
  const exists = await WhitelistItem.findOne({ where: { uid: id, movieid: movieID}})
  return exists ? exists : false;
}

async function checkBlacklist(id: number, movieID: number): Promise<BlacklistItemAttributes | boolean> {
  const exists = await BlacklistItem.findOne({ where: { uid: id, movieid: movieID}})
  return exists ? exists : false;
}


// whitelist
export async function fetchWhitelistQuery(id: number): Promise<WhitelistItemAttributes[] | string | null> {
  const whitelist = await WhitelistItem.findAll({ where: {uid: id}});
  if (!whitelist) return 'no whitelist'
  else {
    let cleanArr: WhitelistItemAttributes[] = [];
    for (let item of whitelist) {
      if (item.dataValues && cleanArr) cleanArr.push(item.dataValues)
    }
    return cleanArr;
  }
}

export async function addWhitelistQuery(id: number, movieID: number): Promise<WhitelistItemAttributes[] | string | null> {
  const existsBlackList = await checkBlacklist(id, movieID);
  if (existsBlackList) deleteBlacklistQuery(id, movieID);
  const exists = await checkWhitelist(id, movieID);
  if (exists) return 'already exists'
  else {
    await WhitelistItem.create({uid: id, movieid: movieID});
    const userList = fetchWhitelistQuery(id);
    return userList;
  }
}

export async function deleteWhitelistQuery(id: number, movieID: number): Promise<WhitelistItemAttributes[] | string | null> {
  const exists = await checkWhitelist(id, movieID);
  if (!exists) return 'does not exist'
  else {
    await WhitelistItem.destroy({where: {uid: id, movieid: movieID}});
    return await fetchWhitelistQuery(id);
  }
}

// blacklist
export async function fetchBlacklistQuery(id: number): Promise<BlacklistItemAttributes[] | string | null> {
  const blacklist = await BlacklistItem.findAll({ where: {uid: id}});
  if (!blacklist) return 'no blacklist'
  else {
    let cleanArr: BlacklistItemAttributes[] = [];
    for (let item of blacklist) {
      if (item.dataValues && cleanArr) cleanArr.push(item.dataValues)
    }
    return cleanArr;
  }
}

export async function addBlacklistQuery(id: number, movieID: number): Promise<BlacklistItemAttributes[] | string | null> {
  const existsWhiteList = await checkWhitelist(id, movieID);
  if (existsWhiteList) deleteWhitelistQuery(id, movieID);
  const exists = await checkBlacklist(id, movieID);
  if (exists) return 'already exists'
  else {
    await BlacklistItem.create({uid: id, movieid: movieID});
    const userList = fetchBlacklistQuery(id);
    return userList;
  }
}

export async function deleteBlacklistQuery(id: number, movieID: number): Promise<BlacklistItemAttributes[] | string | null> {
  const exists = await checkBlacklist(id, movieID);
  if (!exists) return 'does not exist'
  else {
    await BlacklistItem.destroy({where: {uid: id, movieid: movieID}});
    return await fetchBlacklistQuery(id);
  }
}
