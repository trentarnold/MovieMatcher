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
exports.deleteBlacklistQuery = exports.addBlacklistQuery = exports.fetchBlacklistQuery = exports.deleteWhitelistQuery = exports.addWhitelistQuery = exports.fetchWhitelistQuery = void 0;
const whitelist_item_1 = __importDefault(require("../whitelist_item"));
const blacklist_item_1 = __importDefault(require("../blacklist_item"));
// helper
function checkWhitelist(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield whitelist_item_1.default.findOne({ where: { uid: id, movieid: movieID } });
        return exists ? exists : false;
    });
}
function checkBlacklist(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield blacklist_item_1.default.findOne({ where: { uid: id, movieid: movieID } });
        return exists ? exists : false;
    });
}
// whitelist
function fetchWhitelistQuery(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const whitelist = yield whitelist_item_1.default.findAll({ where: { uid: id } });
        if (!whitelist.length)
            return 'no whitelist';
        else {
            let cleanArr = [];
            for (let item of whitelist) {
                if (item.dataValues && cleanArr)
                    cleanArr.push(item.dataValues);
            }
            return cleanArr;
        }
    });
}
exports.fetchWhitelistQuery = fetchWhitelistQuery;
function addWhitelistQuery(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const existsBlackList = yield checkBlacklist(id, movieID);
        if (existsBlackList)
            deleteBlacklistQuery(id, movieID);
        const exists = yield checkWhitelist(id, movieID);
        if (exists)
            return 'already exists';
        else {
            yield whitelist_item_1.default.create({ uid: id, movieid: movieID });
            const userList = fetchWhitelistQuery(id);
            return userList;
        }
    });
}
exports.addWhitelistQuery = addWhitelistQuery;
function deleteWhitelistQuery(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield checkWhitelist(id, movieID);
        if (!exists)
            return 'does not exist';
        else {
            yield whitelist_item_1.default.destroy({ where: { uid: id, movieid: movieID } });
            return yield fetchWhitelistQuery(id);
        }
    });
}
exports.deleteWhitelistQuery = deleteWhitelistQuery;
// blacklist
function fetchBlacklistQuery(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const blacklist = yield blacklist_item_1.default.findAll({ where: { uid: id } });
        if (!blacklist.length)
            return 'no blacklist';
        else {
            let cleanArr = [];
            for (let item of blacklist) {
                if (item.dataValues && cleanArr)
                    cleanArr.push(item.dataValues);
            }
            return cleanArr;
        }
    });
}
exports.fetchBlacklistQuery = fetchBlacklistQuery;
function addBlacklistQuery(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const existsWhiteList = yield checkWhitelist(id, movieID);
        if (existsWhiteList)
            deleteWhitelistQuery(id, movieID);
        const exists = yield checkBlacklist(id, movieID);
        if (exists)
            return 'already exists';
        else {
            yield blacklist_item_1.default.create({ uid: id, movieid: movieID });
            const userList = fetchBlacklistQuery(id);
            return userList;
        }
    });
}
exports.addBlacklistQuery = addBlacklistQuery;
function deleteBlacklistQuery(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield checkBlacklist(id, movieID);
        if (!exists)
            return 'does not exist';
        else {
            yield blacklist_item_1.default.destroy({ where: { uid: id, movieid: movieID } });
            return yield fetchBlacklistQuery(id);
        }
    });
}
exports.deleteBlacklistQuery = deleteBlacklistQuery;
