import { Model } from 'sequelize';
import { sequelize, DataTypes } from './index';

interface WhitelistItemAttributes {
  uid: number;
  movieid: number;
};

interface WhitelistItemInstance
  extends Model<WhitelistItemAttributes>,
  WhitelistItemAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

    const WhitelistItem = sequelize.define<WhitelistItemInstance>('whitelist_item', {
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movieid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })

export default WhitelistItem