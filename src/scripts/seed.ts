import 'dotenv/config';
import { sequelize } from '../config/sequelize.js';
import { User } from '../modules/users/user.model.js';
import { Drop } from '../modules/drops/drop.model.js';
import { Reservation } from '../modules/reservations/reservation.model.js';
import { Purchase } from '../modules/purchases/purchase.model.js';

async function main() {
  await sequelize.authenticate();
  console.log('DB connected! Seeding...');

  await Purchase.destroy({ where: {}, truncate: true, cascade: true });
  await Reservation.destroy({ where: {}, truncate: true, cascade: true });
  await Drop.destroy({ where: {}, truncate: true, cascade: true });
  // await User.destroy({ where: {}, truncate: true, cascade: true });
  console.log('Cleared existing data');

  // const users = await User.bulkCreate([
  //   { username: 'alice' },
  //   { username: 'bob' },
  //   { username: 'carol' },
  //   { username: 'dave' },
  //   { username: 'erin' },
  // ]);

  const users = await User.bulkCreate([
    { id: 'user-alice', username: 'alice' },
    { id: 'user-bob', username: 'bob' },
    { id: 'user-carol', username: 'carol' },
    { id: 'user-dave', username: 'dave' },
    { id: 'user-erin', username: 'erin' },
  ]);
  console.log(`Seeded ${users.length} users`);

  const drops = await Drop.bulkCreate([
    {
      name: 'Air Jordan 1 - Chicago',
      price: '180.00',
      totalStock: 50,
      availableStock: 50,
      startsAt: new Date(),
    },
    {
      name: 'Yeezy Boost 350',
      price: '220.00',
      totalStock: 30,
      availableStock: 30,
      startsAt: new Date(),
    },
    {
      name: 'Last Pair Special Edition',
      price: '999.00',
      totalStock: 1,
      availableStock: 1,
      startsAt: new Date(),
    },
    {
      name: 'Lotto',
      price: '2000.00',
      totalStock: 10,
      availableStock: 10,
      startsAt: new Date(),
    },
  ]);
  console.log(`Seeded ${drops.length} drops`);

  const [chicago, yeezy] = drops;
  const purchasers = [users[0], users[1], users[2], users[3]];

  for (const drop of [chicago, yeezy]) {
    for (const user of purchasers) {
      const reservation = await Reservation.create({
        dropId: drop!.id,
        userId: user!.id,
        status: 'purchased',
        expiresAt: new Date(Date.now() + 60_000),
      });
      await Purchase.create({
        dropId: drop!.id,
        userId: user!.id,
        reservationId: reservation.id,
      });
    }
  }
  console.log('Seeded purchase history for activity feed testing');

  await sequelize.close();
  console.log('Seed complete.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
