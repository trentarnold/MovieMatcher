import { Model } from 'sequelize';
import { sequelize, DataTypes } from './index';

interface WatchedMovieAttributes {
  uid: number;
  movieid: number;
  friendid?: number;
};

interface WatchedMovieInstance
  extends Model<WatchedMovieAttributes>,
    WatchedMovieAttributes {
      createdAt?: Date;
      updatedAt?: Date;
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