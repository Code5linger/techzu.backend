"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropRoutes = void 0;
const express_1 = require("express");
const drop_controller_js_1 = require("./drop.controller.js");
const validateRequest_js_1 = require("../../middlewares/validateRequest.js");
const drop_schema_js_1 = require("./drop.schema.js");
exports.dropRoutes = (0, express_1.Router)();
exports.dropRoutes.get('/drops', drop_controller_js_1.getDrops);
exports.dropRoutes.get('/drops', drop_controller_js_1.getDrops);
exports.dropRoutes.post('/drops', (0, validateRequest_js_1.validateRequest)(drop_schema_js_1.createDropSchema), drop_controller_js_1.postDrop);
//# sourceMappingURL=drop.routes.js.map