import { sequelize } from '../../config/sequelize.js';
import { Drop } from '../drops/drop.model.js';
import { Reservation } from './reservation.model.js';
import { decrementStockIfAvailable } from '../../services/stock.service.js';

const RESERVATION_DURATION_MS = 60_000;

export class OutOfStockError extends Error {
  constructor() {
    super('This item is out of stock.');
    this.name = 'OutOfStockError';
  }
}

export class DropNotFoundError extends Error {
  constructor() {
    super('Drop not found.');
    this.name = 'DropNotFoundError';
  }
}

export async function reserveDrop(dropId: string, userId: string) {
  const drop = await Drop.findByPk(dropId);
  if (!drop) throw new DropNotFoundError();

  return sequelize.transaction(async (t) => {
    const decremented = await decrementStockIfAvailable(dropId, t);

    if (!decremented) {
      throw new OutOfStockError();
    }

    const reservation = await Reservation.create(
      {
        dropId,
        userId,
        expiresAt: new Date(Date.now() + RESERVATION_DURATION_MS),
      },
      { transaction: t },
    );

    return reservation;
  });
}
