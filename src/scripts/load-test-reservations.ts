// src/scripts/load-test-reservations.ts
import 'dotenv/config';
import { sequelize } from '../config/sequelize.js';
import { Drop } from '../modules/drops/drop.model.js';
import { User } from '../modules/users/user.model.js';

const CONCURRENT_REQUESTS = 100;
const API_BASE = process.env.API_BASE ?? 'http://localhost:5000';

async function main() {
  await sequelize.authenticate();

  // create a fresh drop with stock = 1, specifically for this test
  const drop = await Drop.create({
    name: 'LOAD TEST DROP',
    price: '1.00',
    totalStock: 1,
    availableStock: 1,
    startsAt: new Date(),
  });

  // create a fresh user to attribute requests to (reservation logic doesn't yet
  // care about one-reservation-per-user, so any single user id works here)
  const user = await User.create({ username: `loadtest_${Date.now()}` });

  console.log(
    `Firing ${CONCURRENT_REQUESTS} concurrent reserve requests at drop ${drop.id} (stock = 1)...`,
  );

  const requests = Array.from({ length: CONCURRENT_REQUESTS }, () =>
    fetch(`${API_BASE}/api/drops/${drop.id}/reserve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    }).then((res) => res.status),
  );

  const results = await Promise.all(requests);

  const successCount = results.filter((status) => status === 201).length;
  const conflictCount = results.filter((status) => status === 409).length;
  const otherCount = results.length - successCount - conflictCount;

  console.log(
    `Results: ${successCount} succeeded (201), ${conflictCount} rejected (409), ${otherCount} other`,
  );

  await drop.reload();
  console.log(`Final availableStock in DB: ${drop.availableStock}`);

  if (successCount === 1 && drop.availableStock === 0) {
    console.log(
      '✅ PASS: exactly one reservation succeeded, stock correctly at 0',
    );
  } else {
    console.log(
      `❌ FAIL: expected exactly 1 success and stock=0, got ${successCount} successes and stock=${drop.availableStock}`,
    );
  }

  await sequelize.close();
}

main().catch((err) => {
  console.error('Load test failed:', err);
  process.exit(1);
});
