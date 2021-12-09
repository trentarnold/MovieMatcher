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
const index_1 = require("../index");
const index_2 = require("../index");
const User_1 = __importDefault(require("../User"));
const watched_movie_1 = __importDefault(require("../watched_movie"));
const rating_1 = __importDefault(require("../rating"));
const friend_1 = __importDefault(require("../friend"));
const whitelist_item_1 = __importDefault(require("../whitelist_item"));
const blacklist_item_1 = __importDefault(require("../blacklist_item"));
const pop_users_1 = require("./pop-users");
const pop_watched_movies_1 = require("./pop-watched_movies");
const pop_ratings_1 = require("./pop-ratings");
const pop_friends_1 = require("./pop-friends");
const pop_blacklist_1 = require("./pop-blacklist");
const pop_whitelist_1 = require("./pop-whitelist");
(function callInOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, index_2.connectDB)();
        createData();
    });
})();
function createData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.sequelize.drop();
        yield User_1.default.sync();
        yield watched_movie_1.default.sync();
        yield rating_1.default.sync();
        yield friend_1.default.sync();
        yield whitelist_item_1.default.sync();
        yield blacklist_item_1.default.sync();
        yield (0, pop_users_1.populateUsers)();
        yield (0, pop_watched_movies_1.populateWatchedMovies)();
        yield (0, pop_ratings_1.populateRatings)();
        yield (0, pop_friends_1.populateFriends)();
        yield (0, pop_blacklist_1.populateBlacklist)();
        yield (0, pop_whitelist_1.populateWhitelist)();
    });
}
