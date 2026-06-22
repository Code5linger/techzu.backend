import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../../config/sequelize.js';

export type ReservationStatus = 'active' | 'purchased' | 'expired';

export class Reservation extends Model<
  InferAttributes<Reservation>,
  InferCreationAttributes<Reservation>
> {
  declare id: CreationOptional<string>;
  declare dropId: string;
  declare userId: string;
  declare status: CreationOptional<ReservationStatus>;
  declare expiresAt: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Reservation.init(
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
    status: {
      type: DataTypes.ENUM('active', 'purchased', 'expired'),
      allowNull: false,
      defaultValue: 'active',
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations',
    indexes: [
      { fields: ['status', 'expiresAt'] }, // matches the expiration sweep query shape
    ],
  },
);
