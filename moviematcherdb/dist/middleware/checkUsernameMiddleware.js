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
exports.checkUsernameMiddleware = void 0;
const userQueries_1 = require("../models/queries/userQueries");
function checkUsernameMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.body;
            const exists = yield (0, userQueries_1.searchByUsername)(username);
            if (exists) {
                res.status(406).send({ message: 'Username already exists, try another' });
            }
            else {
                next();
            }
        }
        catch (err) {
            console.log('Error checking username', err);
            res.status(400).send('Error checking username');
        }
    });
}
exports.checkUsernameMiddleware = checkUsernameMiddleware;
