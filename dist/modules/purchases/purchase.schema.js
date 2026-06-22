"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchaseSchema = void 0;
const zod_1 = require("zod");
exports.createPurchaseSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid('userId must be a valid UUID'),
});
//# sourceMappingURL=purchase.schema.js.map