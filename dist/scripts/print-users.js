"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const sequelize_js_1 = require("../config/sequelize.js");
const user_model_js_1 = require("../modules/users/user.model.js");
async function main() {
    await sequelize_js_1.sequelize.authenticate();
    const users = await user_model_js_1.User.findAll({ order: [['username', 'ASC']] });
    for (const u of users) {
        console.log(`${u.username}: ${u.id}`);
    }
    await sequelize_js_1.sequelize.close();
}
main();
//# sourceMappingURL=print-users.js.map