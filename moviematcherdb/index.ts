const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port:number = Number(process.env.PORT) || 3001;
const router = require('./Router');
const fileUpload = require('express-fileupload');
import { connectDB } from './models';
import { Request, Response } from 'express';
import { Server, Socket } from "socket.io";
import { IMovie } from './interfaces/movieInterface';
import { APIMovieService } from './Services/APIMovieService';
const { createServer } = require("http");
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, { /* options */ });

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: () => void;
  loggedInUsers: (loggedInUsers:string[]) => void;
  invite: (room:string, otherUserName:string, username:string) => void;
  accepted: (room: string) => void;
  movies: (movie: any, room:string) => void;
  foundMutualMovie: (room:string, movie:IMovie) => void;
  acceptMovie: (movie:IMovie) => void;
  bothUsersAccepted: (userName:string, movieId:string, room:string) => void;
  filter: (room: string, filter:filter) => void;
  sendFilter:(username: string, filters:filter) => void;
  handleAddActor:(id:number, name:string, room:string) => void;
  handleRemoveActor:(id:number, name:string, room:string) => void;
  changed: () => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

interface filter {
  providers:string[],
  genres:string[],
  avoidGenres:string[],
  cast:string[],
}

interface actorData {
  username:string,
  id:string,
}

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('./public'));
app.use(router);
app.get('*', (req:Request,res:Response) => {
  res.status(404).send('The page you are looking for has not been found')
});


interface LooseObject {
  [key: string]: string
}


const users:LooseObject = {};
io.on("connection", (socket: Socket) => {

  socket.on('login', (username:string) => {
    users[socket.id] = username
    const loggedInUsers = Object.values(users);
    io.emit('loggedInUsers', loggedInUsers);
  })
  socket.on('disconnect', () => {
    delete users[socket.id];
    const loggedInUsers = Object.values(users);
    io.emit('loggedInUsers', loggedInUsers);
  })
  socket.on('logout', () => {
    delete users[socket.id];
    const loggedInUsers = Object.values(users);
    io.emit('loggedInUsers', loggedInUsers);
  })
  socket.on('invite', ({room, otherUserName, username}) => {
    let socketId = Object.keys(users).find(key => users[key] === otherUserName);
    socket.join(room);
    if(socketId){
      io.to(socketId).emit('invite', room, otherUserName, username);
    }
  })
  socket.on('providers', (alreadySelectedStreamingServices, room) => {
    socket.to(room).emit('providers', alreadySelectedStreamingServices)
  })
  socket.on('accepted', async(room) => {
    await socket.join(room);
    io.in(room).emit('accepted', room);
  })
  socket.on('denied', (room) => {
    socket.to(room).emit('denied')
  })
  socket.on('declineWatchMovie', (userName, room, title) => {
    socket.to(room).emit('declineWatchMovie', userName, title)
  })
  socket.on('join', async (filters, room) => {
    const withGenres = `&with_genres=${filters.genres}`;
    const withoutGenres = `&without_genres=${filters.avoidGenres}`;
    const cast = `&with_cast=${filters.cast.map((actor:any, index:number) =>{
        return actor.id
    })}`;
    const movies = await Promise.all(
    filters.providers.map( async(provider:number) => {
      const response = await APIMovieService.getFilteredMoviesQuery(withGenres + withoutGenres + cast + `&with_watch_providers=${provider}`);
      return response.results;
    }))
    const newMovies = movies.flat();
    const filteredMovies = newMovies.filter((movie:any, index, self:any) => 
        index === self.findIndex((selfMovie:any) => selfMovie.id === movie.id)
    )
    io.in(room).emit('movies', filteredMovies.flat(), room)
  })
  socket.on('foundMutualMovie', (room:string, movie:IMovie)=>{
    io.in(room).emit('foundMutualMovie', room, movie)
  })
  socket.on('acceptMovie', async(room:string, movie:IMovie) =>{
    io.in(room).emit('acceptMovie', movie)
  })
  socket.on('otherUserAccepted', (room:string, userName:string)=> {
    socket.to(room).emit('otherUserAccepted', userName)
  })
  socket.on('bothUsersAccepted', (room:string, userName, movieId) => {
    io.in(room).emit('bothUsersAccepted', userName, movieId, room)
  })
  socket.on('handleAddToggle', (value, callBackString, id, room) => {
    socket.to(room).emit('handleAddToggle', value, callBackString, id);
  })
  socket.on('handleRemoveToggle', (value, callBackString, id, room) => {
    socket.to(room).emit('handleRemoveToggle', value, callBackString, id);
  })
  socket.on('handleResetToggle', (value, callBackString, id, room) => {
    socket.to(room).emit('handleResetToggle', value, callBackString, id);
  })
  socket.on('handleChangeStreamingProvied', (providerId, room) => {
    socket.to(room).emit('handleChangeStreamingProvied', providerId)
  })
  socket.on('handleAddActor', (id:number, name:string, room:string) => {
    socket.to(room).emit('handleAddActor', id, name);
  })
  socket.on('handleRemoveActor', (id:number, name:string, room:string) => {
    socket.to(room).emit('handleRemoveActor', id);
  })
  socket.on('oneUserAccepted', (room, otherUsername) => {
    socket.to(room).emit('oneUserAccepted', otherUsername)
  })
  socket.on('submitFilters', async (filters, room) => {
    const withGenres = `&with_genres=${filters.genres}`;
    const withoutGenres = `&without_genres=${filters.avoidGenres}`;
    const cast = `&with_cast=${filters.cast.map((actor:actorData) =>actor.id)}`;
    const watchProviders = `&with_watch_providers=${filters.providers}`;
    const response = await APIMovieService.getFilteredMoviesQuery(withGenres + withoutGenres + cast + watchProviders);
    const movieArray = response.results;
    io.in(room).emit('movies', movieArray, room)
  })
  socket.on('changed', (room) => {
    socket.to(room).emit('changed')
  })
});



(async () => {
  await connectDB();
  httpServer.listen(port, (e:any) => {
    if (e) {
      console.log(e);
    } else {
      console.log(`Listening on http://localhost:${port}`);
    }
  });
})();