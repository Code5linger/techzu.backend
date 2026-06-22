"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const sequelize_js_1 = require("../config/sequelize.js");
const user_model_js_1 = require("../modules/users/user.model.js");
const drop_model_js_1 = require("../modules/drops/drop.model.js");
const reservation_model_js_1 = require("../modules/reservations/reservation.model.js");
const purchase_model_js_1 = require("../modules/purchases/purchase.model.js");
async function main() {
    await sequelize_js_1.sequelize.authenticate();
    await purchase_model_js_1.Purchase.destroy({ where: {}, truncate: true, cascade: true });
    await reservation_model_js_1.Reservation.destroy({ where: {}, truncate: true, cascade: true });
    await drop_model_js_1.Drop.destroy({ where: {}, truncate: true, cascade: true });
    await user_model_js_1.User.destroy({ where: {}, truncate: true, cascade: true });
    console.log('Cleared existing data');
    const users = await user_model_js_1.User.bulkCreate([
        { username: 'alice' },
        { username: 'bob' },
        { username: 'carol' },
        { username: 'dave' },
        { username: 'erin' },
    ]);
    console.log(`Seeded ${users.length} users`);
    const drops = await drop_model_js_1.Drop.bulkCreate([
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
    ]);
    console.log(`Seeded ${drops.length} drops`);
    const [chicago, yeezy] = drops;
    const purchasers = [users[0], users[1], users[2], users[3]];
    for (const drop of [chicago, yeezy]) {
        for (const user of purchasers) {
            const reservation = await reservation_model_js_1.Reservation.create({
                dropId: drop.id,
                userId: user.id,
                status: 'purchased',
                expiresAt: new Date(Date.now() + 60_000),
            });
            await purchase_model_js_1.Purchase.create({
                dropId: drop.id,
                userId: user.id,
                reservationId: reservation.id,
            });
        }
    }
    console.log('Seeded purchase history for activity feed testing');
    await sequelize_js_1.sequelize.close();
    console.log('Seed complete.');
}
main().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map