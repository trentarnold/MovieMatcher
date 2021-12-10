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
const User_1 = __importDefault(require("../User"));
(0, index_1.connectDB)();
function find() {
    return __awaiter(this, void 0, void 0, function* () {
        // const res = await User.findAll()
        // console.log(res)
        const res = yield User_1.default.findOne({ where: { id: 1 }, include: ["watched_movies", "ratings", "friends", "whitelist", "blacklist"] });
        if (res) {
            console.log('+++++++++++ watched movies', res.dataValues.watched_movies.map((m) => m.dataValues));
            console.log('+++++++++++ ratings', res.dataValues.ratings.map((m) => m.dataValues));
            console.log('+++++++++++ friends', res.dataValues.friends.map((m) => m.dataValues));
            console.log('+++++++++++ whitelist', res.dataValues.whitelist.map((m) => m.dataValues));
            console.log('+++++++++++ blacklist', res.dataValues.blacklist.map((m) => m.dataValues));
        }
    });
}
find();
