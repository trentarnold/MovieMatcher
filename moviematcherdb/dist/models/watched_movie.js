"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
;
const WatchedMovie = index_1.sequelize.define('watched_movie', {
    uid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
    movieid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
    friendid: {
        type: index_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
});
exports.default = WatchedMovie;
