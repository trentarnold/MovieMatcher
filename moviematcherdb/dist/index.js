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
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = Number(process.env.PORT) || 3001;
const router = require('./Router');
const fileUpload = require('express-fileupload');
const models_1 = require("./models");
const socket_io_1 = require("socket.io");
const APIMovieService_1 = require("./Services/APIMovieService");
const { createServer } = require("http");
const httpServer = createServer(app);
const io = new socket_io_1.Server(httpServer, { /* options */});
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('./public'));
app.use(router);
app.get('*', (req, res) => {
    res.status(404).send('The page you are looking for has not been found');
});
const users = {};
io.on("connection", (socket) => {
    socket.on('login', (username) => {
        users[socket.id] = username;
        const loggedInUsers = Object.values(users);
        io.emit('loggedInUsers', loggedInUsers);
    });
    socket.on('disconnect', () => {
        delete users[socket.id];
        const loggedInUsers = Object.values(users);
        io.emit('loggedInUsers', loggedInUsers);
    });
    socket.on('logout', () => {
        delete users[socket.id];
        const loggedInUsers = Object.values(users);
        io.emit('loggedInUsers', loggedInUsers);
    });
    socket.on('invite', ({ room, otherUserName, username }) => {
        let socketId = Object.keys(users).find(key => users[key] === otherUserName);
        socket.join(room);
        if (socketId) {
            io.to(socketId).emit('invite', room, otherUserName, username);
        }
    });
    socket.on('providers', (alreadySelectedStreamingServices, room) => {
        socket.to(room).emit('providers', alreadySelectedStreamingServices);
    });
    socket.on('accepted', (room) => __awaiter(void 0, void 0, void 0, function* () {
        yield socket.join(room);
        io.in(room).emit('accepted', room);
    }));
    socket.on('denied', (room) => {
        socket.to(room).emit('denied');
    });
    socket.on('declineWatchMovie', (userName, room, title) => {
        socket.to(room).emit('declineWatchMovie', userName, title);
    });
    socket.on('join', (filters, room) => __awaiter(void 0, void 0, void 0, function* () {
        const withGenres = `&with_genres=${filters.genres}`;
        const withoutGenres = `&without_genres=${filters.avoidGenres}`;
        const cast = `&with_cast=${filters.cast.map((actor, index) => {
            return actor.id;
        })}`;
        const movies = yield Promise.all(filters.providers.map((provider) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield APIMovieService_1.APIMovieService.getFilteredMoviesQuery(withGenres + withoutGenres + cast + `&with_watch_providers=${provider}`);
            return response.results;
        })));
        const newMovies = movies.flat();
        const filteredMovies = newMovies.filter((movie, index, self) => index === self.findIndex((selfMovie) => selfMovie.id === movie.id));
        io.in(room).emit('movies', filteredMovies.flat(), room);
    }));
    socket.on('foundMutualMovie', (room, movie) => {
        io.in(room).emit('foundMutualMovie', room, movie);
    });
    socket.on('acceptMovie', (room, movie) => __awaiter(void 0, void 0, void 0, function* () {
        io.in(room).emit('acceptMovie', movie);
    }));
    socket.on('otherUserAccepted', (room, userName) => {
        socket.to(room).emit('otherUserAccepted', userName);
    });
    socket.on('bothUsersAccepted', (room, userName, movieId) => {
        io.in(room).emit('bothUsersAccepted', userName, movieId, room);
    });
    socket.on('handleAddToggle', (value, callBackString, id, room) => {
        socket.to(room).emit('handleAddToggle', value, callBackString, id);
    });
    socket.on('handleRemoveToggle', (value, callBackString, id, room) => {
        socket.to(room).emit('handleRemoveToggle', value, callBackString, id);
    });
    socket.on('handleResetToggle', (value, callBackString, id, room) => {
        socket.to(room).emit('handleResetToggle', value, callBackString, id);
    });
    socket.on('handleChangeStreamingProvied', (providerId, room) => {
        socket.to(room).emit('handleChangeStreamingProvied', providerId);
    });
    socket.on('handleAddActor', (id, name, room) => {
        socket.to(room).emit('handleAddActor', id, name);
    });
    socket.on('handleRemoveActor', (id, name, room) => {
        socket.to(room).emit('handleRemoveActor', id);
    });
    socket.on('oneUserAccepted', (room, otherUsername) => {
        socket.to(room).emit('oneUserAccepted', otherUsername);
    });
    socket.on('submitFilters', (filters, room) => __awaiter(void 0, void 0, void 0, function* () {
        const withGenres = `&with_genres=${filters.genres}`;
        const withoutGenres = `&without_genres=${filters.avoidGenres}`;
        const cast = `&with_cast=${filters.cast.map((actor) => actor.id)}`;
        const watchProviders = `&with_watch_providers=${filters.providers}`;
        const response = yield APIMovieService_1.APIMovieService.getFilteredMoviesQuery(withGenres + withoutGenres + cast + watchProviders);
        const movieArray = response.results;
        io.in(room).emit('movies', movieArray, room);
    }));
    socket.on('changed', (room) => {
        socket.to(room).emit('changed');
    });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, models_1.connectDB)();
    httpServer.listen(port, (e) => {
        if (e) {
            console.log(e);
        }
        else {
            console.log(`Listening on http://localhost:${port}`);
        }
    });
}))();
