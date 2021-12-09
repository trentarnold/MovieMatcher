'use strict';
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
exports.connectDB = exports.DataTypes = exports.sequelize = exports.Sequelize = void 0;
require('dotenv').config();
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
const env = process.env.NODE_ENV || 'development';
const db = process.env.DATABASE || 'postgres://ghwvnvvwwzcdsq:dbde3302e36048c51cb2d8878e5d9075b4e034d005725ea0d485097f4fa9315f@ec2-44-194-145-230.compute-1.amazonaws.com:5432/d1vqu2v24v6r6t';
const sequelize = new sequelize_1.Sequelize(db, {
    "dialect": "postgres",
    "logging": false,
    "dialectOptions": {
        "ssl": {
            "require": true,
            "rejectUnauthorized": false
        }
    }
});
exports.sequelize = sequelize;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('connected to remote DB');
        }
        catch (e) {
            console.log('connection failed: ' + e);
        }
    });
}
exports.connectDB = connectDB;
