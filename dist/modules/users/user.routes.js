"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_js_1 = require("./user.controller.js");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post('/users', user_controller_js_1.postUser);
//# sourceMappingURL=user.routes.js.map