import { Model } from 'sequelize';
import { sequelize, DataTypes } from './index';

export interface RatingAttributes {
  uid: number;
  movieid: number;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  type?: string;
};

export interface RatingInstance
extends Model<RatingAttributes>,
RatingAttributes {
    dataValues?: RatingAttributes
    }

    const Rating = sequelize.define<RatingInstance>('review', {
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movieid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })

export default Rating