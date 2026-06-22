"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drop = void 0;
const sequelize_1 = require("sequelize");
const sequelize_js_1 = require("../../config/sequelize.js");
class Drop extends sequelize_1.Model {
}
exports.Drop = Drop;
Drop.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    totalStock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
    },
    availableStock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
    },
    startsAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: sequelize_js_1.sequelize,
    modelName: 'Drop',
    tableName: 'Drops',
});
//# sourceMappingURL=drop.model.js.map