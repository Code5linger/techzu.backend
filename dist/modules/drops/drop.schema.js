"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDropSchema = void 0;
const zod_1 = require("zod");
exports.createDropSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, 'name is required'),
    price: zod_1.z
        .number()
        .nonnegative('price must be >= 0')
        .or(zod_1.z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, 'price must be a valid decimal string')),
    totalStock: zod_1.z
        .number()
        .int()
        .positive('totalStock must be a positive integer'),
    startsAt: zod_1.z.coerce.date({ message: 'startsAt must be a valid date' }),
});
//# sourceMappingURL=drop.schema.js.map