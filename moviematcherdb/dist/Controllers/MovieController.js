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
const movieQueries_1 = require("../models/queries/movieQueries");
const APIMovieService_1 = require("../Services/APIMovieService");
require('dotenv').config();
function getWatchedMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user && req.body) {
                const watchedMovies = yield (0, movieQueries_1.fetchWatchedMoviesQuery)(req.body.id || req.user.id);
                if (watchedMovies === 'no movies') {
                    res.status(200).send('User has not added any watched movies.');
                }
                else
                    res.status(200).send(watchedMovies); // returns all watched movies
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function addWatchedMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user && req.body) {
                if (!req.body.friendID)
                    req.body.friendID = 0;
                if (!req.body.createdDate)
                    req.body.createdDate = new Date(Date.now());
                const movie = yield (0, movieQueries_1.addWatchedMovieQuery)(req.user.id, req.body.movieID, req.body.friendID, req.body.createdDate);
                res.status(200).send(movie); //returns movies watched with new movie added
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function movieWatchCount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user && req.body) {
                const count = yield (0, movieQueries_1.timesWatchedMovieQuery)(req.user.id, req.body.movieID);
                const countstr = count.toString();
                res.status(200).send(countstr); //returns string of num of times movie was watched
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getFileredMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let params = '';
            if ((req.originalUrl.split('?')[1]) !== undefined) {
                params = '&' + (req.originalUrl.split('?')[1]);
            }
            if (req.body.cast) {
                let cast = req.body.cast;
                let castIDStr = '';
                for (let castMember of cast) {
                    let castID = yield APIMovieService_1.APIMovieService.getCastID(`${castMember}`); //call to get actor/actress id
                    castIDStr += castID.toString() + ',';
                }
                castIDStr = castIDStr.substring(0, castIDStr.length - 1);
                params += `&with_cast=${castIDStr}`;
            }
            let movies = {};
            if (params !== undefined) {
                movies = yield APIMovieService_1.APIMovieService.getFilteredMoviesQuery(params);
            }
            else {
                movies = yield APIMovieService_1.APIMovieService.getMoviesBase(); //base case if no params/cast are passed
            }
            res.status(200).send(movies); // returns arr of Obj
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getPopularMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movies = yield APIMovieService_1.APIMovieService.getPopularMovies();
            res.status(200).send(movies);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getUpcomingMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movies = yield APIMovieService_1.APIMovieService.getUpcomingMovies();
            res.status(200).send(movies);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getActorsList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let params;
            if ((req.originalUrl.split('=')[1]) !== undefined) {
                params = (req.originalUrl.split('=')[1]);
            }
            params = Number(params);
            const actors = yield APIMovieService_1.APIMovieService.getActorListQuery(params);
            res.status(200).send(actors);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getStreamProviders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let params;
            if ((req.originalUrl.split('=')[1]) !== undefined) {
                params = (req.originalUrl.split('=')[1]);
            }
            params = Number(params);
            const Providers = yield APIMovieService_1.APIMovieService.getStreamProvidersQuery(params);
            res.status(200).send(Providers);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getSimilarMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let params;
            if ((req.originalUrl.split('=')[1]) !== undefined) {
                params = (req.originalUrl.split('=')[1]);
            }
            params = Number(params);
            const movies = yield APIMovieService_1.APIMovieService.getSimilarMoviesQuery(params);
            res.status(200).send(movies);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getActorsDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let params;
            if ((req.originalUrl.split('=')[1]) !== undefined) {
                params = (req.originalUrl.split('=')[1]);
            }
            const actorId = Number(params);
            const details = yield APIMovieService_1.APIMovieService.getActorDetailsQuery(actorId);
            res.status(200).send(details);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getCombinedCredits(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let params;
            if ((req.originalUrl.split('=')[1]) !== undefined) {
                params = (req.originalUrl.split('=')[1]);
            }
            params = Number(params);
            const Credits = yield APIMovieService_1.APIMovieService.getCombinedCreditsQuery(params);
            res.status(200).send(Credits);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getIndividualMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let params;
            if ((req.originalUrl.split('=')[1]) !== undefined) {
                params = (req.originalUrl.split('=')[1]);
            }
            params = Number(params);
            const Credits = yield APIMovieService_1.APIMovieService.getSpecificMovieQuery(params);
            res.status(200).send(Credits);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
function getAllStreamProviders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const providers = yield APIMovieService_1.APIMovieService.getStreamingServiceProviders();
            res.status(200).send(providers);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
}
module.exports = {
    getWatchedMovie,
    addWatchedMovie,
    movieWatchCount,
    getFileredMovies,
    getPopularMovies,
    getUpcomingMovies,
    getActorsList,
    getStreamProviders,
    getSimilarMovies,
    getActorsDetails,
    getCombinedCredits,
    getIndividualMovie,
    getAllStreamProviders
};
