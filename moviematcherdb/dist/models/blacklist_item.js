"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
;
const BlacklistItem = index_1.sequelize.define('blacklist_item', {
    uid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
    movieid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = BlacklistItem;
