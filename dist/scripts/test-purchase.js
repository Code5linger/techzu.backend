"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("../config/associations.js");
const reservation_service_js_1 = require("../modules/reservations/reservation.service.js");
const purchase_service_js_1 = require("../modules/purchases/purchase.service.js");
const drop_model_js_1 = require("../modules/drops/drop.model.js");
const user_model_js_1 = require("../modules/users/user.model.js");
const sequelize_js_1 = require("../config/sequelize.js");
async function main() {
    await sequelize_js_1.sequelize.authenticate();
    console.log('Database connected.');
    const user = await user_model_js_1.User.create({ username: `testuser_${Date.now()}` });
    const drop = await drop_model_js_1.Drop.create({
        name: 'TEST DROP FOR PURCHASE',
        price: '9.99',
        totalStock: 5,
        availableStock: 5,
        startsAt: new Date(),
    });
    console.log(`Created test User: ${user.username} (ID: ${user.id})`);
    console.log(`Created test Drop: ${drop.name} (ID: ${drop.id}, Stock: ${drop.availableStock}/${drop.totalStock})`);
    const reservation = await (0, reservation_service_js_1.reserveDrop)(drop.id, user.id);
    console.log(`Reservation created: ${reservation.id}, Expires: ${reservation.expiresAt}`);
    await drop.reload();
    console.log(`Drop stock after reservation: ${drop.availableStock}/${drop.totalStock}`);
    console.log('Attempting purchase...');
    const purchase = await (0, purchase_service_js_1.purchaseReservation)(reservation.id, user.id);
    console.log(`Purchase succeeded! ID: ${purchase.id}`);
    await drop.reload();
    console.log(`Drop stock after purchase: ${drop.availableStock}/${drop.totalStock}`);
    await purchase.destroy();
    await reservation.destroy();
    await drop.destroy();
    await user.destroy();
    console.log('Cleaned up test data.');
    await sequelize_js_1.sequelize.close();
}
main().catch(console.error);
//# sourceMappingURL=test-purchase.js.map