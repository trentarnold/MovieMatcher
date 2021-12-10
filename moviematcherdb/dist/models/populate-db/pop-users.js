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
exports.populateUsers = void 0;
const User_1 = __importDefault(require("../User"));
const bcrypt = require('bcryptjs');
function populateUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        yield User_1.default.create({
            username: "Sam",
            email: "sam@gmail.com",
            password: bcrypt.hashSync("password", 10),
            profile_pic: "/generic_profile.png",
        });
        yield User_1.default.create({
            username: "Caleb",
            email: "caleb@gmail.com",
            password: bcrypt.hashSync("password", 10),
            profile_pic: "/generic_profile.png",
        });
        yield User_1.default.create({
            username: "Trent",
            email: "trent@gmail.com",
            password: bcrypt.hashSync("password", 10),
            profile_pic: "/generic_profile.png",
        });
        yield User_1.default.create({
            username: "Marshal",
            email: "marshal@gmail.com",
            password: bcrypt.hashSync("password", 10),
            profile_pic: "/generic_profile.png",
        });
    });
}
exports.populateUsers = populateUsers;
