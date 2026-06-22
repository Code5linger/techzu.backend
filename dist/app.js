"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prepare_js_1 = require("./db/prepare.js");
const drop_routes_js_1 = require("./modules/drops/drop.routes.js");
const user_routes_js_1 = require("./modules/users/user.routes.js");
require("./config/associations.js");
const reservation_routes_js_1 = require("./modules/reservations/reservation.routes.js");
const purchase_routes_js_1 = require("./modules/purchases/purchase.routes.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('Hello');
});
app.get('/api/ping', (_req, res) => {
    res.status(200).json({
        ok: true,
        service: 'backend',
        hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    });
});
app.get('/api/health', async (_req, res) => {
    try {
        await (0, prepare_js_1.ensureDatabase)();
        res.status(200).json({ ok: true, database: 'connected' });
    }
    catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({
            ok: false,
            database: 'disconnected',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
app.use(async (_req, res, next) => {
    try {
        await (0, prepare_js_1.ensureDatabase)();
        next();
    }
    catch (error) {
        console.error('Database not ready:', error);
        res.status(500).json({
            error: 'DATABASE_ERROR',
            message: error instanceof Error ? error.message : 'Database unavailable',
        });
    }
});
app.use('/api', drop_routes_js_1.dropRoutes);
app.use('/api', user_routes_js_1.userRoutes);
app.use('/api', reservation_routes_js_1.reservationRoutes);
app.use('/api', purchase_routes_js_1.purchaseRoutes);
exports.default = app;
//# sourceMappingURL=app.js.map