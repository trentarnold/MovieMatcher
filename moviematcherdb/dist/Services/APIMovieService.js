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
exports.APIMovieService = void 0;
const axios = require('axios');
const moviePlaceholder_1 = require("../placeholder/moviePlaceholder");
const actorListPlaceholder_1 = require("../placeholder/actorListPlaceholder");
const actorDetailsPlaceholder_1 = require("../placeholder/actorDetailsPlaceholder");
exports.APIMovieService = {
    fetchMovie: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield axios.get('');
            yield result; //.json();
        }
        catch (e) {
            console.log(e);
        }
    }),
    getPopularMovies: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const popularMovies = yield axios.get('https://api.themoviedb.org/3/discover/movie/?api_key=66be68e2d9a8be7fee88a803b45d654b&watch_region=US&with_watch_providers=10');
            return popularMovies.data; //.json();
        }
        catch (e) {
            console.log(e);
            return { results: [] };
        }
    }),
    getUpcomingMovies: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const latestMovies = yield axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&page=1');
            return latestMovies.data; //.json();
        }
        catch (e) {
            console.log(e);
            return { results: [] };
        }
    }),
    getFilteredMoviesQuery: (params) => __awaiter(void 0, void 0, void 0, function* () {
        const movies = yield axios.get('https://api.themoviedb.org/3/discover/movie?api_key=48343d08ec9aa87fbbfecd658bbc7ba9&language=en-US&include_adult=true&include_video=false&watch_region=US&with_watch_monetization_types=flatrate' + params);
        return movies.data;
    }),
    getCastID: (castString) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cast = castString.trim().replace(' ', '%20');
            const castIDArr = yield axios.get(`https://api.themoviedb.org/3/search/person?api_key=48343d08ec9aa87fbbfecd658bbc7ba9&language=en-US&query=${cast}&page=1&include_adult=false`);
            if (castIDArr.data.results.length === 0) {
                return '';
            }
            const castID = castIDArr.data.results[0].id;
            return (castID);
        }
        catch (err) {
            console.log(err);
        }
    }),
    getMoviesBase: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movies = yield axios.get('https://api.themoviedb.org/3/discover/movie?api_key=48343d08ec9aa87fbbfecd658bbc7ba9&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false');
            return movies.data;
        }
        catch (err) {
            console.log(err);
        }
    }),
    getIndividualMovie: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movie = yield axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en`);
            return yield movie; //.json()
        }
        catch (e) {
            console.log(e);
            return moviePlaceholder_1.movieDetailsPlaceHolder;
        }
    }),
    getActorListQuery: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const actorList = yield axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=66be68e2d9a8be7fee88a803b45d654b`);
            return actorList.data; //.json()
        }
        catch (err) {
            console.log(err);
            return actorListPlaceholder_1.actorListPlaceholder;
        }
    }),
    getStreamProvidersQuery: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const streamProvider = yield axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=66be68e2d9a8be7fee88a803b45d654b`);
            const data = streamProvider.data; //.json();
            return data;
        }
        catch (err) {
            console.log(err);
            return actorListPlaceholder_1.actorListPlaceholder;
        }
    }),
    getSimilarMoviesQuery: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const similarMovies = yield axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=66be68e2d9a8be7fee88a803b45d654b&with_watch_providers=10&watch_region=US`);
            return similarMovies.data; //.json();
        }
        catch (e) {
            console.log(e);
            return { results: [] };
        }
    }),
    getActorDetailsQuery: (actorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const actorDetails = yield axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=66be68e2d9a8be7fee88a803b45d654b`);
            return actorDetails.data; //.json();
        }
        catch (e) {
            console.log(e);
            return actorDetailsPlaceholder_1.actorDetailsPlaceholder;
        }
    }),
    getCombinedCreditsQuery: (actorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const similarMovies = yield axios.get(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=66be68e2d9a8be7fee88a803b45d654b`);
            let data = yield similarMovies; //.json();
            return data.data;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }),
    getSpecificMovieQuery: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movie = yield axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en`);
            return movie.data;
        }
        catch (err) {
            console.log(err);
            return moviePlaceholder_1.movieDetailsPlaceHolder;
        }
    }),
    getStreamingServiceProviders: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const providers = yield axios.get(`https://api.themoviedb.org/3/watch/providers/movie?api_key=bb4d2a2c87649509a7f5db093eec838e&language=en-US&watch_region=US`);
            return yield providers.data.results;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    })
};
module.exports = {
    APIMovieService: exports.APIMovieService
};
