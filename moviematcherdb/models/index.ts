'use strict';

import { Sequelize, DataTypes } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// if (config.url) {
//   var sequelize = new Sequelize(config.url, config);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

var sequelize = new Sequelize(config.database, config.username, config.password, config);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('connected to movie matcher DB');
  } catch (e) {
    console.log('connection failed: ' + e);
  }
}

export { Sequelize, sequelize, DataTypes, connectDB }
