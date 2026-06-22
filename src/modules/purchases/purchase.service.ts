import { sequelize } from '../../config/sequelize.js';
import { Reservation } from '../reservations/reservation.model.js';
import { Purchase } from './purchase.model.js';
import { decrementTotalStock } from '../../services/stock.service.js';

export class ReservationNotFoundError extends Error {
  constructor() {
    super('Reservation not found.');
    this.name = 'ReservationNotFoundError';
  }
}

export class ReservationNotOwnedError extends Error {
  constructor() {
    super('This reservation does not belong to you.');
    this.name = 'ReservationNotOwnedError';
  }
}

export class ReservationExpiredError extends Error {
  constructor() {
    super('This reservation has expired.');
    this.name = 'ReservationExpiredError';
  }
}

export class ReservationAlreadyResolvedError extends Error {
  constructor() {
    super('This reservation has already been purchased or expired.');
    this.name = 'ReservationAlreadyResolvedError';
  }
}

export async function purchaseReservation(
  reservationId: string,
  userId: string,
) {
  const reservation = await Reservation.findByPk(reservationId);
  if (!reservation) throw new ReservationNotFoundError();

  if (reservation.userId !== userId) throw new ReservationNotOwnedError();

  if (reservation.expiresAt.getTime() < Date.now()) {
    throw new ReservationExpiredError();
  }

  return sequelize.transaction(async (t) => {
    const [affectedRows] = await Reservation.update(
      { status: 'purchased' },
      {
        where: { id: reservationId, status: 'active' },
        transaction: t,
      },
    );

    if (affectedRows === 0) {
      throw new ReservationAlreadyResolvedError();
    }

    const purchase = await Purchase.create(
      {
        dropId: reservation.dropId,
        userId: reservation.userId,
        reservationId: reservation.id,
      },
      { transaction: t },
    );

    await decrementTotalStock(reservation.dropId, t);

    return purchase;
  });
}
