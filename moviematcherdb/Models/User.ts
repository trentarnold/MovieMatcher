import { Model, Optional } from 'sequelize';
import { sequelize, DataTypes } from './index';
import WatchedMovie, { WatchedMovieInstance } from './watched_movie';
import Rating, { RatingInstance } from './rating';
import Friend from './friend';
import WhitelistItem, { WhitelistItemInstance } from './whitelist_item';
import BlacklistItem, { BlacklistItemInstance } from './blacklist_item';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_pic: string;
  streaming?: number[];
  createdAt?: Date;
  updatedAt?: Date;
  watched_movies?: WatchedMovieInstance[];
  ratings?: RatingInstance[];
  whitelist?: WhitelistItemInstance[];
  blacklist?: BlacklistItemInstance[];
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
      dataValues?: UserAttributes;
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
    type: DataTypes.TEXT,
    allowNull: true
  },
  streaming: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  }
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
