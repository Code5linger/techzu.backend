import 'dotenv/config';
import '../config/associations.js';
import { Reservation } from '../modules/reservations/reservation.model.js';
import { User } from '../modules/users/user.model.js';

async function main() {
  const active = await Reservation.findAll({
    where: { status: 'active' },
    include: [User],
  });

  console.log(`Found ${active.length} active reservations:`);
  for (const r of active) {
    console.log(`- Reservation ID: ${r.id}`);
    console.log(`  Drop ID: ${r.dropId}`);
    console.log(`  User: ${r.User?.username} (ID: ${r.userId})`);
    console.log(`  Expires At: ${r.expiresAt}`);
    console.log('');
  }
}

main().catch(console.error);
