"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationRoutes = void 0;
const express_1 = require("express");
const reservation_controller_js_1 = require("./reservation.controller.js");
const validateRequest_js_1 = require("../../middlewares/validateRequest.js");
const reservation_schema_js_1 = require("./reservation.schema.js");
exports.reservationRoutes = (0, express_1.Router)();
exports.reservationRoutes.post('/drops/:dropId/reserve', (0, validateRequest_js_1.validateRequest)(reservation_schema_js_1.createReservationSchema), reservation_controller_js_1.postReservation);
//# sourceMappingURL=reservation.routes.js.map