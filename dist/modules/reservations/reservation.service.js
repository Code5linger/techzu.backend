"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropNotFoundError = exports.OutOfStockError = void 0;
exports.reserveDrop = reserveDrop;
const sequelize_js_1 = require("../../config/sequelize.js");
const drop_model_js_1 = require("../drops/drop.model.js");
const reservation_model_js_1 = require("./reservation.model.js");
const stock_service_js_1 = require("../../services/stock.service.js");
const RESERVATION_DURATION_MS = 60_000;
class OutOfStockError extends Error {
    constructor() {
        super('This item is out of stock.');
        this.name = 'OutOfStockError';
    }
}
exports.OutOfStockError = OutOfStockError;
class DropNotFoundError extends Error {
    constructor() {
        super('Drop not found.');
        this.name = 'DropNotFoundError';
    }
}
exports.DropNotFoundError = DropNotFoundError;
async function reserveDrop(dropId, userId) {
    const drop = await drop_model_js_1.Drop.findByPk(dropId);
    if (!drop)
        throw new DropNotFoundError();
    return sequelize_js_1.sequelize.transaction(async (t) => {
        const decremented = await (0, stock_service_js_1.decrementStockIfAvailable)(dropId, t);
        if (!decremented) {
            throw new OutOfStockError();
        }
        const reservation = await reservation_model_js_1.Reservation.create({
            dropId,
            userId,
            expiresAt: new Date(Date.now() + RESERVATION_DURATION_MS),
        }, { transaction: t });
        return reservation;
    });
}
//# sourceMappingURL=reservation.service.js.map