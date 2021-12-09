"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
;
const Rating = index_1.sequelize.define('review', {
    uid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
    movieid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = Rating;
