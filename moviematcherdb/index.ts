const express = require('express');
const cors = require('cors');
const app = express();
const port:number = 3001;
const router = require('./Router');
const fileUpload = require('express-fileupload');
import { connectDB } from './models';
import { Request, Response } from 'express';
import { Server, Socket } from "socket.io";
import { emit } from 'process';
const { createServer } = require("http");
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, { /* options */ });

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: () => void;
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

    // let http = require("http").Server(app);
    // let io = require("socket.io")(http);
    
    // io.on('connection', (socket: any) =>{
    //   io.emit('connected')
      
    //   socket.on('message', (message:string)=>{
    //     io.emti({message})
    //   })
    // })
    
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('./public'));
app.use(router);
app.get('*', (req:Request,res:Response) => {
  res.status(404).send('The page you are looking for has not been found')
});

io.on("connection", (socket: Socket) => {
  
  socket.on('message', ()=> {
    socket.emit('message', {name:"okay", message:"fine"})
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