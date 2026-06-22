"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReservationSchema = void 0;
const zod_1 = require("zod");
exports.createReservationSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid('userId must be a valid UUID'),
});
//# sourceMappingURL=reservation.schema.js.map