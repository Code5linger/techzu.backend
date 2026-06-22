"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationAlreadyResolvedError = exports.ReservationExpiredError = exports.ReservationNotOwnedError = exports.ReservationNotFoundError = void 0;
exports.purchaseReservation = purchaseReservation;
const sequelize_js_1 = require("../../config/sequelize.js");
const reservation_model_js_1 = require("../reservations/reservation.model.js");
const purchase_model_js_1 = require("./purchase.model.js");
const stock_service_js_1 = require("../../services/stock.service.js");
class ReservationNotFoundError extends Error {
    constructor() {
        super('Reservation not found.');
        this.name = 'ReservationNotFoundError';
    }
}
exports.ReservationNotFoundError = ReservationNotFoundError;
class ReservationNotOwnedError extends Error {
    constructor() {
        super('This reservation does not belong to you.');
        this.name = 'ReservationNotOwnedError';
    }
}
exports.ReservationNotOwnedError = ReservationNotOwnedError;
class ReservationExpiredError extends Error {
    constructor() {
        super('This reservation has expired.');
        this.name = 'ReservationExpiredError';
    }
}
exports.ReservationExpiredError = ReservationExpiredError;
class ReservationAlreadyResolvedError extends Error {
    constructor() {
        super('This reservation has already been purchased or expired.');
        this.name = 'ReservationAlreadyResolvedError';
    }
}
exports.ReservationAlreadyResolvedError = ReservationAlreadyResolvedError;
async function purchaseReservation(reservationId, userId) {
    const reservation = await reservation_model_js_1.Reservation.findByPk(reservationId);
    if (!reservation)
        throw new ReservationNotFoundError();
    if (reservation.userId !== userId)
        throw new ReservationNotOwnedError();
    if (reservation.expiresAt.getTime() < Date.now()) {
        throw new ReservationExpiredError();
    }
    return sequelize_js_1.sequelize.transaction(async (t) => {
        const [affectedRows] = await reservation_model_js_1.Reservation.update({ status: 'purchased' }, {
            where: { id: reservationId, status: 'active' },
            transaction: t,
        });
        if (affectedRows === 0) {
            throw new ReservationAlreadyResolvedError();
        }
        const purchase = await purchase_model_js_1.Purchase.create({
            dropId: reservation.dropId,
            userId: reservation.userId,
            reservationId: reservation.id,
        }, { transaction: t });
        await (0, stock_service_js_1.decrementTotalStock)(reservation.dropId, t);
        return purchase;
    });
}
//# sourceMappingURL=purchase.service.js.map