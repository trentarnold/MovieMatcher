"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
;
const WhitelistItem = index_1.sequelize.define('whitelist_item', {
    uid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
    movieid: {
        type: index_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = WhitelistItem;
