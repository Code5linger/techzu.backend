"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_js_1 = __importDefault(require("./app.js"));
const index_js_1 = require("./socket/index.js");
const expiration_job_js_1 = require("./jobs/expiration.job.js");
const bootstrap = () => {
    const httpServer = http_1.default.createServer(app_js_1.default);
    (0, index_js_1.initSocketServer)(httpServer);
    const port = process.env.PORT || 5000;
    httpServer.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        (0, expiration_job_js_1.startExpirationSweep)();
    });
};
bootstrap();
//# sourceMappingURL=server.js.map