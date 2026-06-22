"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    console.error('DATABASE_URL is not set');
}
exports.sequelize = new sequelize_1.Sequelize(databaseUrl ?? '', {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 2,
        min: 0,
        acquire: 10_000,
        idle: 0,
    },
    dialectOptions: process.env.NODE_ENV === 'production' ||
        databaseUrl?.includes('neon.tech') ||
        databaseUrl?.includes('sslmode')
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
});
//# sourceMappingURL=sequelize.js.map