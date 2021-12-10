"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriendQuery = exports.addFriendQuery = exports.findAllFriends = exports.findAllFriendsID = void 0;
const friend_1 = __importDefault(require("../friend"));
const userQueries_1 = require("./userQueries");
const sequelize_1 = require("sequelize");
function findAllFriendsID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const friendIDArr = [id];
        const userFriends = yield friend_1.default.findAll({ where: { uid: id } });
        const friendUsers = yield friend_1.default.findAll({ where: { friendid: id } });
        userFriends.map(friend => {
            if (friend.dataValues)
                friendIDArr.push(friend.dataValues.friendid);
        });
        friendUsers.map(friend => {
            if (friend.dataValues)
                friendIDArr.push(friend.dataValues.uid);
        });
        if (friendIDArr.length === 1)
            return 'no friends';
        friendIDArr.shift();
        const uniqueSet = new Set(friendIDArr);
        const uniqueArr = [...uniqueSet];
        return uniqueArr;
    });
}
exports.findAllFriendsID = findAllFriendsID;
function findAllFriends(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const IDs = yield findAllFriendsID(id);
        if (IDs !== 'no friends') {
            return Promise.all(IDs.map((num) => {
                return (0, userQueries_1.fetchUserQuery)(num);
            }));
        }
    });
}
exports.findAllFriends = findAllFriends;
function friendExists(id, friendID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield friend_1.default.findOne({ where: { [sequelize_1.Op.or]: [{ [sequelize_1.Op.and]: [{ uid: id }, { friendid: friendID }] }, { [sequelize_1.Op.and]: [{ uid: friendID }, { friendid: id }] }] } });
        return exists && exists.dataValues ? exists.dataValues : false;
    });
}
function addFriendQuery(id, friendID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield friendExists(id, friendID);
        if (exists)
            return 'already exists';
        else {
            yield friend_1.default.create({ uid: id, friendid: friendID });
            return yield findAllFriends(id);
        }
    });
}
exports.addFriendQuery = addFriendQuery;
function deleteFriendQuery(id, friendID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield friendExists(id, friendID);
        if (!exists)
            return 'does not exist';
        else {
            const userID = exists.uid;
            const friend = exists.friendid;
            yield friend_1.default.destroy({ where: { uid: userID, friendid: friend } });
            return yield findAllFriends(id);
        }
    });
}
exports.deleteFriendQuery = deleteFriendQuery;
