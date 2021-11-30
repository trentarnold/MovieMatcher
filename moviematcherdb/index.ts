const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const router = require('./Router');
const connectDB = require('./models/index');
import { Request, Response } from 'express';

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);
app.get('*', (req:Request,res:Response) => {
  res.status(404).send('The page you are looking for has not been found')
});

(async () => {
  await connectDB();
  app.listen((port:number, e:any) => {
    if (e) {
      console.log(e);
    } else {
      console.log(`Listening on http://localhost:${port}`);
    }
  });
})();