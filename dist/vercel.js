"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
require("dotenv/config");
const app_js_1 = __importDefault(require("./app.js"));
function handler(req, res) {
    (0, app_js_1.default)(req, res);
}
//# sourceMappingURL=vercel.js.map