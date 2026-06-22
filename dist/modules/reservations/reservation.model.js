"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const sequelize_1 = require("sequelize");
const sequelize_js_1 = require("../../config/sequelize.js");
class Reservation extends sequelize_1.Model {
}
exports.Reservation = Reservation;
Reservation.init({
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
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'purchased', 'expired'),
        allowNull: false,
        defaultValue: 'active',
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: sequelize_js_1.sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations',
    indexes: [{ fields: ['status', 'expiresAt'] }],
});
//# sourceMappingURL=reservation.model.js.map