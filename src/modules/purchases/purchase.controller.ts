import type { Request, Response } from 'express';
import {
  purchaseReservation,
  ReservationNotFoundError,
  ReservationNotOwnedError,
  ReservationExpiredError,
  ReservationAlreadyResolvedError,
} from './purchase.service.js';
import type { CreatePurchaseInput } from './purchase.schema.js';
import {
  emitStockUpdated,
  emitPurchaseCompleted,
} from '../../socket/stock.socket.js';
import { User } from '../users/user.model.js';

export async function postPurchase(req: Request, res: Response) {
  try {
    const { reservationId } = req.params;
    if (!reservationId || Array.isArray(reservationId)) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'reservationId is required.',
      });
    }

    const { userId } = req.body as CreatePurchaseInput;
    const purchase = await purchaseReservation(reservationId, userId);

    const user = await User.findByPk(userId);
    emitPurchaseCompleted(
      purchase.dropId,
      user?.username ?? 'unknown',
      purchase.purchasedAt,
    );
    emitStockUpdated(purchase.dropId);

    return res.status(201).json({
      purchaseId: purchase.id,
      dropId: purchase.dropId,
    });
  } catch (err) {
    if (err instanceof ReservationNotFoundError) {
      return res
        .status(404)
        .json({ error: 'RESERVATION_NOT_FOUND', message: err.message });
    }
    if (err instanceof ReservationNotOwnedError) {
      return res
        .status(403)
        .json({ error: 'RESERVATION_NOT_OWNED', message: err.message });
    }
    if (
      err instanceof ReservationExpiredError ||
      err instanceof ReservationAlreadyResolvedError
    ) {
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
