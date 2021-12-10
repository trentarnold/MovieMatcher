"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
;
const Friend = index_1.sequelize.define('friend', {
    uid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
    friendid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = Friend;
