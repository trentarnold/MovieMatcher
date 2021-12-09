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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriends = exports.getByUsername = exports.getSpecificUser = exports.getUser = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const friendsQueries_1 = require("../models/queries/friendsQueries");
const userQueries_1 = require("../models/queries/userQueries");
const listQueries_1 = require("../models/queries/listQueries");
require('dotenv').config();
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                const user = yield (0, userQueries_1.updateUserQuery)(req.user.id, req.body);
                res.status(201).send(user); // returns the user after update
            }
            else {
                res.status(401).send('User could not be updated.');
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user) {
                res.status(200).send(req.user);
            }
            else {
                res.status(500).send({ message: "User not authorized" });
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
exports.getUser = getUser;
function getSpecificUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body) {
                const user = yield (0, userQueries_1.fetchUserQuery)(req.body.id);
                res.status(200).send(user); //returns the queried user
            }
            else {
                res.status(500).send({ message: "User not found" });
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
exports.getSpecificUser = getSpecificUser;
function getByUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body) {
                const user = yield (0, userQueries_1.searchByUsername)(req.body.username);
                res.status(200).send(user); //returns the queried user
            }
            else {
                res.status(500).send({ message: "User not found" });
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
exports.getByUsername = getByUsername;
function getFriends(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user) {
                const friends = yield (0, friendsQueries_1.findAllFriends)(req.body.id || req.user.id);
                if (friends === null) {
                    res.status(200).send('User has no friends. Loser.');
                }
                else {
                    res.status(200).send(friends); //returns friends list
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
exports.getFriends = getFriends;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { username, email, password, profile_pic } = req.body;
            const hash = yield bcrypt.hash(password, 10);
            password = hash;
            const user = yield (0, userQueries_1.createUserQuery)({ username, email, password, profile_pic });
            if (user) {
                const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
                res.status(201).send({ user, accessToken }); //returns the created user and their JWT
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield (0, userQueries_1.searchByUsername)(username);
            if (user === null) {
                return res.status(409).send({ error: '409', message: 'Invalid login, please try again.' });
            }
            ;
            const validatedUser = yield bcrypt.compare(password, user.password);
            if (validatedUser) {
                const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
                const { id, username, email, profile_pic, createdAt, updatedAt } = user;
                res.status(200).send({ accessToken, user: { id, username, email, profile_pic, createdAt, updatedAt } }); //returns the user that logged in and their JWT
            }
            else {
                res.status(400).send({ confirmed: false });
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getAllPeople(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const people = yield (0, userQueries_1.getAllPeopleQuery)();
            res.status(201).send(people); //returns all users
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function addFriend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                if (req.user.id === req.body.friendid)
                    return res.status(401).send(`Can't add yourself as a friend.`);
                const user = yield (0, friendsQueries_1.addFriendQuery)(req.user.id, req.body.friendid);
                if (user != null) {
                    res.status(201).send(user); // returns updated friends list
                }
                else {
                    res.status(401).send(`Friend could not be added.`);
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function deleteFriend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                if (req.user.id === req.body.friendid)
                    return res.status(401).send(`Can't delete yourself as a friend.`);
                const remaining = yield (0, friendsQueries_1.deleteFriendQuery)(req.user.id, req.body.friendid);
                if (remaining != null) {
                    res.status(200).send(remaining); // returns remaining friends
                }
                else {
                    res.status(401).send('Friend could not be deleted');
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function addWant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                const Want = yield (0, listQueries_1.addWhitelistQuery)(req.user.id, req.body.movieID);
                if (Want === 'already exists') {
                    res.status(201).send('Movie is already on Want list.');
                }
                else {
                    res.status(201).send(Want); //Returns Want list with new movie added
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function deleteWant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                const deleted = yield (0, listQueries_1.deleteWhitelistQuery)(req.user.id, req.body.movieID);
                if (deleted === 'does not exist') {
                    res.status(201).send('Movie is not in Want list.');
                }
                else {
                    res.status(201).send(deleted); //returns want list after removing movie
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getWant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                const wantlist = yield (0, listQueries_1.fetchWhitelistQuery)(req.body.id || req.user.id);
                if (wantlist === 'no whitelist') {
                    res.status(200).send('User does not have any movie on their Want list');
                }
                else {
                    res.status(201).send(wantlist); //sends want list
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function addBlacklist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                const Blacklistitem = yield (0, listQueries_1.addBlacklistQuery)(req.user.id, req.body.movieID);
                if (Blacklistitem === 'already exists') {
                    res.status(201).send('Movie is already on Blacklist.');
                }
                else {
                    res.status(201).send(Blacklistitem); //Returns Blacklist with new movie added
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function deleteBlacklist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                const deleted = yield (0, listQueries_1.deleteBlacklistQuery)(req.user.id, req.body.movieID);
                if (deleted === 'does not exist') {
                    res.status(201).send('Movie is not in Blacklist.');
                }
                else {
                    res.status(201).send(deleted); //returns Blacklist after removing movie
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getBlacklist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                const Blacklist = yield (0, listQueries_1.fetchBlacklistQuery)(req.body.id || req.user.id);
                if (Blacklist === 'no blacklist') {
                    res.status(200).send('User does not have any movie on their Blacklist');
                }
                else {
                    res.status(201).send(Blacklist); //sends Blacklist
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function toggleStreaming(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user && req.params) {
                const streamingServices = yield (0, userQueries_1.toggleStreamingService)(req.user.id, Number(req.params.streamID));
                res.status(200).send(streamingServices);
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
module.exports = {
    updateUser,
    getUser,
    getFriends,
    getByUsername,
    createUser,
    loginUser,
    getAllPeople,
    addFriend,
    deleteFriend,
    addWant,
    deleteWant,
    getWant,
    addBlacklist,
    deleteBlacklist,
    getBlacklist,
    getSpecificUser,
    toggleStreaming,
};
