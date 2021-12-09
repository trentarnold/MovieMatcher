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
exports.setPictureMiddleware = exports.updatePictureMiddleware = void 0;
const path = require('path');
function updatePictureMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.files) {
                if (req.body.profile_pic) {
                    delete req.body.profile_pic;
                }
                next();
            }
            else {
                if (req.user) {
                    const newImage = req.files.image;
                    const directory = path.join(__dirname, `../public/`);
                    const filetype = newImage.name.split('.').slice(-1);
                    newImage.mv(`${directory}${req.user.username}_profile_picture.${filetype}`);
                    req.body.profile_pic = `/${req.user.username}_profile_picture.${filetype}`;
                    next();
                }
            }
        }
        catch (err) {
            console.log('Error updating user picture', err);
            res.status(400).send('Error updating user picture');
        }
    });
}
exports.updatePictureMiddleware = updatePictureMiddleware;
function setPictureMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.files) {
                if (req.body.profile_pic) {
                    delete req.body.profile_pic;
                }
                const generic = '/generic_profile.png';
                req.body.profile_pic = generic;
                next();
            }
            else {
                if (req.user) {
                    const newImage = req.files.image;
                    const directory = path.join(__dirname, `../public/`);
                    const filetype = newImage.name.split('.').slice(-1);
                    newImage.mv(`${directory}${req.user.username}_profile_picture.${filetype}`);
                    req.body.profile_pic = `/${req.user.username}_profile_picture.${filetype}`;
                    next();
                }
            }
        }
        catch (err) {
            console.log('Error setting user picture', err);
            res.status(400).send('Error updating user picture');
        }
    });
}
exports.setPictureMiddleware = setPictureMiddleware;
