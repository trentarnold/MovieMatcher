const express = require('express');
const cors = require('cors');
const app = express();
const port:number = 3001;
const router = require('./Router');
const fileUpload = require('express-fileupload');
import { connectDB } from './models';
import { Request, Response } from 'express';

// const corsConfig = {
//   origin: 'http://localhost:3001',
//   //credentials: true
// };

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'))
app.use(router);
app.get('*', (req:Request,res:Response) => {
  res.status(404).send('The page you are looking for has not been found')
});

(async () => {
  await connectDB();
  app.listen(port, (e:any) => {
    if (e) {
      console.log(e);
    } else {
      console.log(`Listening on http://localhost:${port}`);
    }
  });
})();