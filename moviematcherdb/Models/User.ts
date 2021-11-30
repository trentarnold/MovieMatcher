import { Model, Optional } from 'sequelize';
import { sequelize, DataTypes } from './index';
import WatchedMovie from './watched_movie';
import Rating from './rating';
import Friend from './friend';
import WhitelistItem from './whitelist_item';
import BlacklistItem from './blacklist_item';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_pic: string;
};

/*
  We have to declare the AuthorCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_pic: {
    type: DataTypes.STRING,
    allowNull: true
  },
})

// ASSOCIATIONS

// user -- watched movies
User.hasMany(WatchedMovie, { sourceKey: "id", foreignKey: "uid", as: "watched_movies" })
WatchedMovie.belongsTo(User, { foreignKey: "uid" })

// user -- ratings
User.hasMany(Rating, { sourceKey: "id", foreignKey: "uid", as: "ratings" })
// Rating.belongsTo(User, { foreignKey: "uid" })

// user -- friends
User.hasMany(Friend, { sourceKey: "id", foreignKey: "uid", as: 'friends' })

// user -- whitelist
User.hasMany(WhitelistItem, { sourceKey: "id", foreignKey: "uid", as: 'whitelist' })

// user -- blacklist
User.hasMany(BlacklistItem, { sourceKey: "id", foreignKey: "uid", as: 'blacklist' })

export default User