"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseRoutes = void 0;
const express_1 = require("express");
const purchase_controller_js_1 = require("./purchase.controller.js");
const validateRequest_js_1 = require("../../middlewares/validateRequest.js");
const purchase_schema_js_1 = require("./purchase.schema.js");
exports.purchaseRoutes = (0, express_1.Router)();
exports.purchaseRoutes.post('/reservations/:reservationId/purchase', (0, validateRequest_js_1.validateRequest)(purchase_schema_js_1.createPurchaseSchema), purchase_controller_js_1.postPurchase);
//# sourceMappingURL=purchase.routes.js.map