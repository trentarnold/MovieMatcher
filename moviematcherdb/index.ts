const express = require('express');
const cors = require('cors');
const app = express();
const port:number = 3001;
const router = require('./Router');
const fileUpload = require('express-fileupload');
import { connectDB } from './models';
import { Request, Response } from 'express';
import { Server, Socket } from "socket.io";
import axios from 'axios';
import { Movie } from '../interfaces/movieInterface';
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
  movies: (movie: Movie[], room:string) => void;
  foundMutualMovie: (room:string, movie:Movie) => void;
  acceptMovie: (movie:Movie) => void;
  bothUsersAccepted: (userName:string, movieId:string, room:string) => void;
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
  socket.on('join',async(room) =>{
    const response =  await axios.get('https://api.themoviedb.org/3/discover/movie/?api_key=66be68e2d9a8be7fee88a803b45d654b&with_watch_providers=10&watch_region=US');
    const movieArray = response.data.results
    io.in(room).emit('movies', movieArray, room)
  })
  socket.on('foundMutualMovie', (room:string, movie:Movie)=>{
    io.in(room).emit('foundMutualMovie', room, movie)
  })
  socket.on('acceptMovie', async(room:string, movie:Movie) =>{
    io.in(room).emit('acceptMovie', movie)
  })
  socket.on('otherUserAccepted', (room:string, userName:string)=> {
    socket.to(room).emit('otherUserAccepted', userName)
  })
  socket.on('bothUsersAccepted', (room:string, userName, movieId) => {
    io.in(room).emit('bothUsersAccepted', userName, movieId, room)
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