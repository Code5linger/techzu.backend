import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../../config/sequelize.js';

export class Drop extends Model<
  InferAttributes<Drop>,
  InferCreationAttributes<Drop>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare price: string;
  declare totalStock: number;
  declare availableStock: number;
  declare startsAt: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Drop.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    availableStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Drop',
    tableName: 'Drops',
  },
);
