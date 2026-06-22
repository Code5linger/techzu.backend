"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReservation = postReservation;
const reservation_service_js_1 = require("./reservation.service.js");
const stock_socket_js_1 = require("../../socket/stock.socket.js");
async function postReservation(req, res) {
    try {
        const { dropId } = req.params;
        if (!dropId || Array.isArray(dropId)) {
            return res
                .status(400)
                .json({ error: 'VALIDATION_ERROR', message: 'dropId is required.' });
        }
        const { userId } = req.body;
        const reservation = await (0, reservation_service_js_1.reserveDrop)(dropId, userId);
        (0, stock_socket_js_1.emitStockUpdated)(dropId);
        return res.status(201).json({
            reservationId: reservation.id,
            dropId: reservation.dropId,
            expiresAt: reservation.expiresAt,
        });
    }
    catch (err) {
        if (err instanceof reservation_service_js_1.OutOfStockError) {
            return res
                .status(409)
                .json({ error: 'OUT_OF_STOCK', message: err.message });
        }
        if (err instanceof reservation_service_js_1.DropNotFoundError) {
            return res
                .status(404)
                .json({ error: 'DROP_NOT_FOUND', message: err.message });
        }
        console.error('Failed to create reservation:', err);
        return res.status(500).json({
            error: 'INTERNAL_ERROR',
            message: 'Failed to create reservation.',
        });
    }
}
//# sourceMappingURL=reservation.controller.js.map