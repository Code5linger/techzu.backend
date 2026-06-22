import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../../config/sequelize.js';

export class Purchase extends Model<
  InferAttributes<Purchase>,
  InferCreationAttributes<Purchase>
> {
  declare id: CreationOptional<string>;
  declare dropId: string;
  declare userId: string;
  declare reservationId: string;
  declare purchasedAt: CreationOptional<Date>;
}

Purchase.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    dropId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Drops', key: 'id' },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
    },
    reservationId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: 'Reservations', key: 'id' },
    },
    purchasedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Purchase',
    tableName: 'Purchases',
    timestamps: false,
    indexes: [{ fields: ['dropId', 'purchasedAt'] }],
  },
);
