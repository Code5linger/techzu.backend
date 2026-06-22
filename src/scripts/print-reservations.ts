import 'dotenv/config';
import '../config/associations.js';
import { Reservation } from '../modules/reservations/reservation.model.js';
import { User } from '../modules/users/user.model.js';

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const active = await Reservation.findAll({
    where: { status: 'active' },
    include: [User],
  });
}

main().catch(console.error);
