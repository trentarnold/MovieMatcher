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
exports.timesWatchedMovieQuery = exports.addWatchedMovieQuery = exports.fetchWatchedMoviesQuery = void 0;
const watched_movie_1 = __importDefault(require("../watched_movie"));
const sequelize_1 = require("sequelize");
function fetchWatchedMoviesQuery(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const watchedMoviesDirtyArr = [];
        const uidMovies = yield watched_movie_1.default.findAll({ where: { uid: id } });
        const fidMovies = yield watched_movie_1.default.findAll({ where: { friendid: id } });
        if (uidMovies.length === 0 && fidMovies.length === 0)
            return 'no movies';
        uidMovies.map(movie => {
            if (movie.dataValues)
                watchedMoviesDirtyArr.push(movie.dataValues);
        });
        fidMovies.map(movie => {
            if (movie.dataValues)
                watchedMoviesDirtyArr.push(movie.dataValues);
        });
        const movieSet = new Set(watchedMoviesDirtyArr);
        const movieArr = [...movieSet];
        return movieArr;
    });
}
exports.fetchWatchedMoviesQuery = fetchWatchedMoviesQuery;
function addWatchedMovieQuery(id, movieID, friendID = 0, createdDate = new Date(Date.now())) {
    return __awaiter(this, void 0, void 0, function* () {
        const movie = yield watched_movie_1.default.create({ uid: id, movieid: movieID, friendid: friendID, createdAt: createdDate });
        return movie.dataValues ? movie.dataValues : undefined;
    });
}
exports.addWatchedMovieQuery = addWatchedMovieQuery;
function timesWatchedMovieQuery(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const moviesLen = yield watched_movie_1.default.count({ where: { [sequelize_1.Op.and]: [{ movieid: movieID }, { [sequelize_1.Op.or]: [{ uid: id }, { friendid: id }] }] } });
        return moviesLen;
    });
}
exports.timesWatchedMovieQuery = timesWatchedMovieQuery;
