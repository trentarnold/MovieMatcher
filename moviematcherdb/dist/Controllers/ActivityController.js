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
const activityQueries_1 = require("../models/queries/activityQueries");
const ratingQuery_1 = require("../models/queries/ratingQuery");
function getActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body && req.user) {
                const activity = yield (0, activityQueries_1.recentActivityQuery)(req.body.id || req.user.id);
                res.status(200).send(activity); //returns array of activities
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function addRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user && req.body) {
                const ratings = yield (0, ratingQuery_1.addRatingQuery)(req.user.id, req.body.movieID, req.body.rating);
                res.status(201).send(ratings);
            }
            else {
                res.status(400).send(`Couldn't add rating`);
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function deleteRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user && req.body) {
                const ratings = yield (0, ratingQuery_1.deleteRatingQuery)(req.user.id, req.body.movieID);
                res.status(201).send(ratings);
            }
            else {
                res.status(400).send(`Couldn't delete rating`);
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getRatings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user) {
                let ratings;
                if (req.params.movieID)
                    ratings = yield (0, ratingQuery_1.getRatingsByMovieQuery)(Number(req.params.movieID));
                else
                    ratings = yield (0, ratingQuery_1.getRatingsByIDQuery)(req.user.id);
                res.status(200).send(ratings);
            }
            else {
                res.status(400).send(`Ratings couldn't be found for user`);
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
module.exports = {
    getActivity,
    addRating,
    deleteRating,
    getRatings
};
