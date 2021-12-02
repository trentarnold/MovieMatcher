import { Model } from 'sequelize';
import { sequelize, DataTypes } from './index';

export interface WatchedMovieAttributes {
  uid: number;
  movieid: number;
  friendid?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface WatchedMovieInstance
  extends Model<WatchedMovieAttributes>,
    WatchedMovieAttributes {
      dataValues?: WatchedMovieAttributes
    }

    const WatchedMovie = sequelize.define<WatchedMovieInstance>('watched_movie', {
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movieid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      friendid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    })

export default WatchedMovie