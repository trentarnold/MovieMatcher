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
exports.toggleStreamingService = exports.updateUserQuery = exports.createUserQuery = exports.searchByUsername = exports.getAllPeopleQuery = exports.fetchUserActivityQuery = exports.fetchUserQuery = void 0;
const User_1 = __importDefault(require("../User"));
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
function fetchUserQuery(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ where: { id: id }, attributes: ['id', 'username', 'email', 'profile_pic', 'streaming', 'createdAt', 'updatedAt'] });
        return user && user.dataValues ? user.dataValues : null;
    });
}
exports.fetchUserQuery = fetchUserQuery;
function fetchUserActivityQuery(id, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({
            where: { id: id, createdAt: { [sequelize_1.Op.gte]: date } },
            attributes: ['id', 'username', 'email', 'profile_pic', 'createdAt', 'updatedAt'],
            include: ["watched_movies", "ratings", "whitelist", "blacklist"]
        });
        return user && user.dataValues ? user.dataValues : null;
    });
}
exports.fetchUserActivityQuery = fetchUserActivityQuery;
function getAllPeopleQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        const Users = yield User_1.default.findAll({ attributes: ['id', 'username', 'email', 'profile_pic', 'createdAt', 'updatedAt'] });
        return Users;
    });
}
exports.getAllPeopleQuery = getAllPeopleQuery;
function searchByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ where: { username: username } });
        return user && user.dataValues ? user.dataValues : null;
    });
}
exports.searchByUsername = searchByUsername;
function createUserQuery(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRes = yield User_1.default.create(user);
        return yield fetchUserQuery(userRes.id);
    });
}
exports.createUserQuery = createUserQuery;
function updateUserQuery(id, fields) {
    return __awaiter(this, void 0, void 0, function* () {
        yield User_1.default.update(fields, { where: { id: id } });
        return yield fetchUserQuery(id);
    });
}
exports.updateUserQuery = updateUserQuery;
function toggleStreamingService(id, streamID) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const services = yield User_1.default.findOne({ where: { id }, attributes: ['streaming'] });
        let cleanServices;
        if ((_a = services === null || services === void 0 ? void 0 : services.dataValues) === null || _a === void 0 ? void 0 : _a.streaming) {
            cleanServices = (_b = services === null || services === void 0 ? void 0 : services.dataValues) === null || _b === void 0 ? void 0 : _b.streaming.map(s => Number(s));
        }
        if (cleanServices === null || cleanServices === void 0 ? void 0 : cleanServices.includes(streamID)) {
            yield deleteStreamingService(id, streamID);
        }
        else {
            yield addStreamingService(id, streamID);
        }
        const res = yield User_1.default.findOne({ where: { id }, attributes: ['streaming'] });
        return (res === null || res === void 0 ? void 0 : res.dataValues) !== null ? res === null || res === void 0 ? void 0 : res.dataValues : [];
    });
}
exports.toggleStreamingService = toggleStreamingService;
function addStreamingService(id, streamID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.sequelize.query(`UPDATE users SET streaming=array_append(streaming, '${streamID}') where id=${id};`);
    });
}
function deleteStreamingService(id, streamID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.sequelize.query(`UPDATE users SET streaming=array_remove(streaming, '${streamID}') where id=${id};`);
    });
}
