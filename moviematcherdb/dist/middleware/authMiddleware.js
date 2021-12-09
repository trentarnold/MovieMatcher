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
exports.authMiddleware = void 0;
const jwt = require('jsonwebtoken');
const userQueries_1 = require("../models/queries/userQueries");
require('dotenv').config();
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.headers.authorization) {
                res.status(401).send({ message: "Credentials required" });
                return;
            }
            const token = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(token, process.env.SECRET_KEY);
            const user = yield (0, userQueries_1.fetchUserQuery)(id);
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(403).send({ message: "Error authenticating user" });
            }
        }
        catch (err) {
            console.log('Error authenticating user', err);
            res.status(500).send({ message: "Error authenticating user" });
        }
    });
}
exports.authMiddleware = authMiddleware;
