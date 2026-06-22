"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("../config/associations.js");
const reservation_model_js_1 = require("../modules/reservations/reservation.model.js");
const user_model_js_1 = require("../modules/users/user.model.js");
async function main() {
    const active = await reservation_model_js_1.Reservation.findAll({
        where: { status: 'active' },
        include: [user_model_js_1.User],
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
//# sourceMappingURL=print-reservations.js.map