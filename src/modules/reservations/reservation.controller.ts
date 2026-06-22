import type { Request, Response } from 'express';
import {
  reserveDrop,
  OutOfStockError,
  DropNotFoundError,
} from './reservation.service.js';
import type { CreateReservationInput } from './reservation.schema.js';
import { emitStockUpdated } from '../../socket/stock.socket.js';

export async function postReservation(req: Request, res: Response) {
  try {
    const { dropId } = req.params;
    if (!dropId || Array.isArray(dropId)) {
      return res
        .status(400)
        .json({ error: 'VALIDATION_ERROR', message: 'dropId is required.' });
    }

    const { userId } = req.body as CreateReservationInput;
    const reservation = await reserveDrop(dropId, userId);

    emitStockUpdated(dropId);

    return res.status(201).json({
      reservationId: reservation.id,
      dropId: reservation.dropId,
      expiresAt: reservation.expiresAt,
    });
  } catch (err) {
    if (err instanceof OutOfStockError) {
      return res
        .status(409)
        .json({ error: 'OUT_OF_STOCK', message: err.message });
    }
    if (err instanceof DropNotFoundError) {
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
