"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sweepExpiredReservations = sweepExpiredReservations;
exports.startExpirationSweep = startExpirationSweep;
exports.stopExpirationSweep = stopExpirationSweep;
const sequelize_1 = require("sequelize");
const sequelize_js_1 = require("../config/sequelize.js");
const reservation_model_js_1 = require("../modules/reservations/reservation.model.js");
const stock_service_js_1 = require("../services/stock.service.js");
const stock_socket_js_1 = require("../socket/stock.socket.js");
const SWEEP_INTERVAL_MS = 5_000;
async function sweepExpiredReservations() {
    const expired = await reservation_model_js_1.Reservation.findAll({
        where: {
            status: 'active',
            expiresAt: { [sequelize_1.Op.lt]: new Date() },
        },
    });
    if (expired.length === 0)
        return;
    for (const reservation of expired) {
        try {
            await sequelize_js_1.sequelize.transaction(async (t) => {
                const [affectedRows] = await reservation_model_js_1.Reservation.update({ status: 'expired' }, {
                    where: { id: reservation.id, status: 'active' },
                    transaction: t,
                });
                if (affectedRows === 0)
                    return;
                await (0, stock_service_js_1.incrementStock)(reservation.dropId, t);
            });
            (0, stock_socket_js_1.emitStockUpdated)(reservation.dropId);
            console.log(`Reservation ${reservation.id} expired, stock released for drop ${reservation.dropId}`);
        }
        catch (err) {
            console.error(`Failed to expire reservation ${reservation.id}:`, err);
        }
    }
}
let intervalHandle = null;
function startExpirationSweep() {
    if (intervalHandle)
        return;
    intervalHandle = setInterval(() => {
        sweepExpiredReservations().catch((err) => {
            console.error('Expiration sweep failed:', err);
        });
    }, SWEEP_INTERVAL_MS);
    console.log(`Expiration sweep started (every ${SWEEP_INTERVAL_MS / 1000}s)`);
}
function stopExpirationSweep() {
    if (intervalHandle) {
        clearInterval(intervalHandle);
        intervalHandle = null;
    }
}
//# sourceMappingURL=expiration.job.js.map