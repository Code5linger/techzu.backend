"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const sequelize_1 = require("sequelize");
const sequelize_js_1 = require("../../config/sequelize.js");
class Purchase extends sequelize_1.Model {
}
exports.Purchase = Purchase;
Purchase.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    dropId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: 'Drops', key: 'id' },
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
    },
    reservationId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'Reservations', key: 'id' },
    },
    purchasedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_js_1.sequelize,
    modelName: 'Purchase',
    tableName: 'Purchases',
    timestamps: false,
    indexes: [{ fields: ['dropId', 'purchasedAt'] }],
});
//# sourceMappingURL=purchase.model.js.map