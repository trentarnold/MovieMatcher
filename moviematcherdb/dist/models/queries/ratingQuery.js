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
exports.deleteRatingQuery = exports.addRatingQuery = exports.getRatingsByMovieQuery = exports.getRatingsByIDQuery = void 0;
const __1 = require("..");
const rating_1 = __importDefault(require("../rating"));
// helper 
function checkRating(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield rating_1.default.findOne({ where: { uid: id, movieid: movieID } });
        return exists ? exists.dataValues : null;
    });
}
function getRatingsByIDQuery(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const ratings = yield rating_1.default.findAll({ where: { uid: id } });
        if (!ratings.length)
            return 'no ratings';
        else {
            const cleanRatings = [];
            for (let rating of ratings) {
                if (rating.dataValues)
                    cleanRatings.push(rating.dataValues);
            }
            return cleanRatings;
        }
        ;
    });
}
exports.getRatingsByIDQuery = getRatingsByIDQuery;
function getRatingsByMovieQuery(movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const ratings = yield rating_1.default.findAll({ where: { movieid: movieID } });
        if (!ratings.length)
            return 'no ratings';
        else {
            const cleanRatings = [];
            for (let rating of ratings) {
                if (rating.dataValues)
                    cleanRatings.push(rating.dataValues);
            }
            return cleanRatings;
        }
        ;
    });
}
exports.getRatingsByMovieQuery = getRatingsByMovieQuery;
function addRatingQuery(id, movieID, rating) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield checkRating(id, movieID);
        if (exists)
            return 'already rated';
        else {
            yield rating_1.default.create({ uid: id, movieid: movieID, rating });
            return yield getRatingsByIDQuery(id);
        }
    });
}
exports.addRatingQuery = addRatingQuery;
function deleteRatingQuery(id, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield checkRating(id, movieID);
        if (!exists)
            return 'not yet rated';
        else {
            yield rating_1.default.destroy({ where: { uid: id, movieid: movieID } });
            return yield getRatingsByIDQuery(id);
        }
    });
}
exports.deleteRatingQuery = deleteRatingQuery;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, __1.connectDB)();
        console.log(yield getRatingsByMovieQuery(512195));
        // console.log(await addRatingQuery(1, 512195, 5));
    });
}
// run()
