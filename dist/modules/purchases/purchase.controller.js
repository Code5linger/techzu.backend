"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPurchase = postPurchase;
const purchase_service_js_1 = require("./purchase.service.js");
const stock_socket_js_1 = require("../../socket/stock.socket.js");
const user_model_js_1 = require("../users/user.model.js");
async function postPurchase(req, res) {
    try {
        const { reservationId } = req.params;
        if (!reservationId || Array.isArray(reservationId)) {
            return res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: 'reservationId is required.',
            });
        }
        const { userId } = req.body;
        const purchase = await (0, purchase_service_js_1.purchaseReservation)(reservationId, userId);
        const user = await user_model_js_1.User.findByPk(userId);
        (0, stock_socket_js_1.emitPurchaseCompleted)(purchase.dropId, user?.username ?? 'unknown', purchase.purchasedAt);
        (0, stock_socket_js_1.emitStockUpdated)(purchase.dropId);
        return res.status(201).json({
            purchaseId: purchase.id,
            dropId: purchase.dropId,
        });
    }
    catch (err) {
        if (err instanceof purchase_service_js_1.ReservationNotFoundError) {
            return res
                .status(404)
                .json({ error: 'RESERVATION_NOT_FOUND', message: err.message });
        }
        if (err instanceof purchase_service_js_1.ReservationNotOwnedError) {
            return res
                .status(403)
                .json({ error: 'RESERVATION_NOT_OWNED', message: err.message });
        }
        if (err instanceof purchase_service_js_1.ReservationExpiredError ||
            err instanceof purchase_service_js_1.ReservationAlreadyResolvedError) {
            return res
                .status(410)
                .json({ error: 'RESERVATION_EXPIRED', message: err.message });
        }
        console.error('Failed to complete purchase:', err);
        return res.status(500).json({
            error: 'INTERNAL_ERROR',
            message: 'Failed to complete purchase.',
        });
    }
}
//# sourceMappingURL=purchase.controller.js.map