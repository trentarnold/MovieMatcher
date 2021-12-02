import { Model } from 'sequelize';
import { sequelize, DataTypes } from './index';

export interface BlacklistItemAttributes {
  uid: number;
  movieid: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface BlacklistItemInstance
  extends Model<BlacklistItemAttributes>,
  BlacklistItemAttributes {
    dataValues?: BlacklistItemAttributes
    }

    const BlacklistItem = sequelize.define<BlacklistItemInstance>('blacklist_item', {
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movieid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })

export default BlacklistItem