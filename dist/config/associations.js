"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_js_1 = require("../modules/users/user.model.js");
const drop_model_js_1 = require("../modules/drops/drop.model.js");
const reservation_model_js_1 = require("../modules/reservations/reservation.model.js");
const purchase_model_js_1 = require("../modules/purchases/purchase.model.js");
user_model_js_1.User.hasMany(reservation_model_js_1.Reservation, { foreignKey: 'userId' });
reservation_model_js_1.Reservation.belongsTo(user_model_js_1.User, { foreignKey: 'userId' });
drop_model_js_1.Drop.hasMany(reservation_model_js_1.Reservation, { foreignKey: 'dropId' });
reservation_model_js_1.Reservation.belongsTo(drop_model_js_1.Drop, { foreignKey: 'dropId' });
user_model_js_1.User.hasMany(purchase_model_js_1.Purchase, { foreignKey: 'userId' });
purchase_model_js_1.Purchase.belongsTo(user_model_js_1.User, { foreignKey: 'userId' });
drop_model_js_1.Drop.hasMany(purchase_model_js_1.Purchase, { foreignKey: 'dropId' });
purchase_model_js_1.Purchase.belongsTo(drop_model_js_1.Drop, { foreignKey: 'dropId' });
reservation_model_js_1.Reservation.hasOne(purchase_model_js_1.Purchase, { foreignKey: 'reservationId' });
purchase_model_js_1.Purchase.belongsTo(reservation_model_js_1.Reservation, { foreignKey: 'reservationId' });
//# sourceMappingURL=associations.js.map