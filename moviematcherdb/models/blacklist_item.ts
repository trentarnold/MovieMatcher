import { Model } from 'sequelize';
import { sequelize, DataTypes } from './index';

interface BlacklistItemAttributes {
  uid: number;
  movieid: number;
};

interface BlacklistItemInstance
  extends Model<BlacklistItemAttributes>,
  BlacklistItemAttributes {
      createdAt?: Date;
      updatedAt?: Date;
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