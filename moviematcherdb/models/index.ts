'use strict';
require('dotenv').config();

import { Sequelize, DataTypes } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const db = process.env.DATABASE || 'postgres://ghwvnvvwwzcdsq:dbde3302e36048c51cb2d8878e5d9075b4e034d005725ea0d485097f4fa9315f@ec2-44-194-145-230.compute-1.amazonaws.com:5432/d1vqu2v24v6r6t';

const sequelize = new Sequelize(db, {
  "dialect": "postgres",
  "logging": false,
  "dialectOptions": {
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    }
  }
})

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('connected to remote DB');
  } catch (e) {
    console.log('connection failed: ' + e);
  }
}

export { Sequelize, sequelize, DataTypes, connectDB }
