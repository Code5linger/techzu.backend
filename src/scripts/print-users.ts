import 'dotenv/config';
import { sequelize } from '../config/sequelize.js';
import { User } from '../modules/users/user.model.js';

async function main() {
  await sequelize.authenticate();
  const users = await User.findAll({ order: [['username', 'ASC']] });
  for (const u of users) {
    console.log(`${u.username}: ${u.id}`);
  }
  await sequelize.close();
}

main();
