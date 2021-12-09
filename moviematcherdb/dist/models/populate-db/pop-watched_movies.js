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
exports.populateWatchedMovies = void 0;
const watched_movie_1 = __importDefault(require("../watched_movie"));
function populateWatchedMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        yield watched_movie_1.default.create({
            uid: 1,
            movieid: 580489,
        });
        yield watched_movie_1.default.create({
            uid: 2,
            movieid: 580489,
            friendid: 3
        });
        yield watched_movie_1.default.create({
            uid: 1,
            movieid: 566525,
            friendid: 3
        });
        yield watched_movie_1.default.create({
            uid: 3,
            movieid: 512195,
            friendid: 2
        });
        yield watched_movie_1.default.create({
            uid: 2,
            movieid: 568124,
            friendid: 1
        });
    });
}
exports.populateWatchedMovies = populateWatchedMovies;
