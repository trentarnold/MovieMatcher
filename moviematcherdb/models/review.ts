import { Model } from 'sequelize';
import { sequelize, DataTypes } from './index';

interface RatingAttributes {
  uid: number;
  movieid: number;
  rating: number;
};

interface RatingInstance
  extends Model<RatingAttributes>,
  RatingAttributes {
      createdAt?: Date;
      updatedAt?: Date;
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