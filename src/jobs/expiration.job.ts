import { Op } from 'sequelize';
import { sequelize } from '../config/sequelize.js';
import { Reservation } from '../modules/reservations/reservation.model.js';
import { incrementStock } from '../services/stock.service.js';
import { emitStockUpdated } from '../socket/stock.socket.js';

const SWEEP_INTERVAL_MS = 5_000;

async function sweepExpiredReservations(): Promise<void> {
  const expired = await Reservation.findAll({
    where: {
      status: 'active',
      expiresAt: { [Op.lt]: new Date() },
    },
  });

  if (expired.length === 0) return;

  for (const reservation of expired) {
    try {
      await sequelize.transaction(async (t) => {
        const [affectedRows] = await Reservation.update(
          { status: 'expired' },
          {
            where: { id: reservation.id, status: 'active' },
            transaction: t,
          },
        );

        if (affectedRows === 0) return;

        await incrementStock(reservation.dropId, t);
      });

      emitStockUpdated(reservation.dropId);
      console.log(
        `Reservation ${reservation.id} expired, stock released for drop ${reservation.dropId}`,
      );
    } catch (err) {
      console.error(`Failed to expire reservation ${reservation.id}:`, err);
    }
  }
}

let intervalHandle: NodeJS.Timeout | null = null;

export function startExpirationSweep(): void {
  if (intervalHandle) return;
  intervalHandle = setInterval(() => {
    sweepExpiredReservations().catch((err) => {
      console.error('Expiration sweep failed:', err);
    });
  }, SWEEP_INTERVAL_MS);
  console.log(`Expiration sweep started (every ${SWEEP_INTERVAL_MS / 1000}s)`);
}

export function stopExpirationSweep(): void {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
  }
}
