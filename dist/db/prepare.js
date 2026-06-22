"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareDatabase = prepareDatabase;
exports.ensureDatabase = ensureDatabase;
const sequelize_js_1 = require("../config/sequelize.js");
require("../config/associations.js");
const user_model_js_1 = require("../modules/users/user.model.js");
const drop_model_js_1 = require("../modules/drops/drop.model.js");
let ready = null;
async function seedIfEmpty() {
    const dropCount = await drop_model_js_1.Drop.count();
    if (dropCount > 0)
        return;
    await user_model_js_1.User.bulkCreate([
        { username: 'alice' },
        { username: 'bob' },
        { username: 'carol' },
    ]);
    await drop_model_js_1.Drop.bulkCreate([
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
            name: 'Travis Scott x Air Jordan 1 Low',
            price: '150.00',
            totalStock: 1,
            availableStock: 1,
            startsAt: new Date(),
        },
    ]);
    console.log('Seeded initial users and drops');
}
async function prepareDatabase() {
    await sequelize_js_1.sequelize.authenticate();
    await sequelize_js_1.sequelize.sync();
    await seedIfEmpty();
    console.log('Database ready');
}
function ensureDatabase() {
    if (!ready) {
        ready = prepareDatabase().catch((error) => {
            ready = null;
            throw error;
        });
    }
    return ready;
}
//# sourceMappingURL=prepare.js.map