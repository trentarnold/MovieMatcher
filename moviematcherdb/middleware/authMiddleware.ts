const jwt = require('jsonwebtoken');
import { fetchUserQuery } from '../models/queries/userQueries';
import { UserInstance } from '../models/user';
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

export interface RequestInstance extends Request {
  user?: UserInstance;
}

export async function authMiddleware(req: RequestInstance, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.headers.authorization) {
      res.status(401).send({message: "Credentials required"});
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await fetchUserQuery(id);
    if (user) {
      req.user = user;
      next()
    } else {
      res.status(403).send({message: "Error authenticating user"});
    }
  } catch (err) {
    console.log('Error authenticating user', err)
    res.status(500).send({message: "Error authenticating user"});
  }
}
