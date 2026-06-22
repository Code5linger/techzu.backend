import 'dotenv/config';
import '../config/associations.js';
import { reserveDrop } from '../modules/reservations/reservation.service.js';
import { purchaseReservation } from '../modules/purchases/purchase.service.js';
import { Drop } from '../modules/drops/drop.model.js';
import { User } from '../modules/users/user.model.js';
import { sequelize } from '../config/sequelize.js';

async function main() {
  await sequelize.authenticate();
  console.log('Database connected.');

  const user = await User.create({ username: `testuser_${Date.now()}` });
  const drop = await Drop.create({
    name: 'TEST DROP FOR PURCHASE',
    price: '9.99',
    totalStock: 5,
    availableStock: 5,
    startsAt: new Date(),
  });

  console.log(`Created test User: ${user.username} (ID: ${user.id})`);
  console.log(
    `Created test Drop: ${drop.name} (ID: ${drop.id}, Stock: ${drop.availableStock}/${drop.totalStock})`,
  );

  const reservation = await reserveDrop(drop.id, user.id);
  console.log(
    `Reservation created: ${reservation.id}, Expires: ${reservation.expiresAt}`,
  );

  await drop.reload();
  console.log(
    `Drop stock after reservation: ${drop.availableStock}/${drop.totalStock}`,
  );

  console.log('Attempting purchase...');
  const purchase = await purchaseReservation(reservation.id, user.id);
  console.log(`Purchase succeeded! ID: ${purchase.id}`);

  await drop.reload();
  console.log(
    `Drop stock after purchase: ${drop.availableStock}/${drop.totalStock}`,
  );

  await purchase.destroy();
  await reservation.destroy();
  await drop.destroy();
  await user.destroy();
  console.log('Cleaned up test data.');
  await sequelize.close();
}

main().catch(console.error);
