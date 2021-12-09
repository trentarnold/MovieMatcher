"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const watched_movie_1 = __importDefault(require("./watched_movie"));
const rating_1 = __importDefault(require("./rating"));
const friend_1 = __importDefault(require("./friend"));
const whitelist_item_1 = __importDefault(require("./whitelist_item"));
const blacklist_item_1 = __importDefault(require("./blacklist_item"));
;
const User = index_1.sequelize.define('user', {
    id: {
        type: index_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    username: {
        type: index_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: index_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: index_1.DataTypes.STRING,
        allowNull: false
    },
    profile_pic: {
        type: index_1.DataTypes.TEXT,
        allowNull: true
    },
    streaming: {
        type: index_1.DataTypes.ARRAY(index_1.DataTypes.STRING),
        allowNull: true
    }
});
// ASSOCIATIONS
// user -- watched movies
User.hasMany(watched_movie_1.default, { sourceKey: "id", foreignKey: "uid", as: "watched_movies" });
watched_movie_1.default.belongsTo(User, { foreignKey: "uid" });
// user -- ratings
User.hasMany(rating_1.default, { sourceKey: "id", foreignKey: "uid", as: "ratings" });
// Rating.belongsTo(User, { foreignKey: "uid" })
// user -- friends
User.hasMany(friend_1.default, { sourceKey: "id", foreignKey: "uid", as: 'friends' });
// user -- whitelist
User.hasMany(whitelist_item_1.default, { sourceKey: "id", foreignKey: "uid", as: 'whitelist' });
// user -- blacklist
User.hasMany(blacklist_item_1.default, { sourceKey: "id", foreignKey: "uid", as: 'blacklist' });
exports.default = User;
