"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDropsWithActivity = listDropsWithActivity;
exports.createDrop = createDrop;
const drop_model_js_1 = require("./drop.model.js");
const purchase_model_js_1 = require("../purchases/purchase.model.js");
const user_model_js_1 = require("../users/user.model.js");
const reservation_model_js_1 = require("../reservations/reservation.model.js");
async function listDropsWithActivity() {
    const drops = await drop_model_js_1.Drop.findAll({
        order: [
            ['createdAt', 'ASC'],
            ['id', 'ASC'],
        ],
    });
    if (drops.length === 0)
        return [];
    const dropIds = drops.map((d) => d.id);
    // Fetch active reservations
    const activeReservations = await reservation_model_js_1.Reservation.findAll({
        where: { dropId: dropIds, status: 'active' },
        order: [['createdAt', 'DESC']],
        include: [{ model: user_model_js_1.User, attributes: ['username'] }],
    });
    // Fetch purchases
    const purchases = await purchase_model_js_1.Purchase.findAll({
        where: { dropId: dropIds },
        order: [['purchasedAt', 'DESC']],
        include: [{ model: user_model_js_1.User, attributes: ['username'] }],
    });
    // Combine and sort activities per drop in memory
    const activitiesByDrop = new Map();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getUsername = (obj) => obj.User?.username ?? 'unknown';
    for (const res of activeReservations) {
        const list = activitiesByDrop.get(res.dropId) ?? [];
        list.push({
            username: getUsername(res),
            type: 'reserved',
            timestamp: res.createdAt,
        });
        activitiesByDrop.set(res.dropId, list);
    }
    for (const pur of purchases) {
        const list = activitiesByDrop.get(pur.dropId) ?? [];
        list.push({
            username: getUsername(pur),
            type: 'purchased',
            timestamp: pur.purchasedAt,
        });
        activitiesByDrop.set(pur.dropId, list);
    }
    for (const [dropId, list] of activitiesByDrop.entries()) {
        list.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        activitiesByDrop.set(dropId, list.slice(0, 3));
    }
    return drops.map((drop) => ({
        id: drop.id,
        name: drop.name,
        price: drop.price,
        totalStock: drop.totalStock,
        availableStock: drop.availableStock,
        startsAt: drop.startsAt,
        recentActivities: activitiesByDrop.get(drop.id) ?? [],
    }));
}
async function createDrop(input) {
    const priceAsString = typeof input.price === 'number' ? input.price.toFixed(2) : input.price;
    const drop = await drop_model_js_1.Drop.create({
        name: input.name,
        price: priceAsString,
        totalStock: input.totalStock,
        availableStock: input.totalStock,
        startsAt: input.startsAt,
    });
    return drop;
}
//# sourceMappingURL=drop.service.js.map