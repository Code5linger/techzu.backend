"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrementStockIfAvailable = decrementStockIfAvailable;
exports.incrementStock = incrementStock;
exports.decrementTotalStock = decrementTotalStock;
const sequelize_js_1 = require("../config/sequelize.js");
const sequelize_1 = require("sequelize");
async function decrementStockIfAvailable(dropId, transaction) {
    const [, affectedRows] = await sequelize_js_1.sequelize.query(`UPDATE "Drops"
     SET "availableStock" = "availableStock" - 1, "updatedAt" = NOW()
     WHERE id = :dropId AND "availableStock" > 0`, {
        replacements: { dropId },
        type: sequelize_1.QueryTypes.UPDATE,
        transaction,
    });
    return affectedRows === 1;
}
async function incrementStock(dropId, transaction) {
    await sequelize_js_1.sequelize.query(`UPDATE "Drops"
     SET "availableStock" = "availableStock" + 1, "updatedAt" = NOW()
     WHERE id = :dropId`, {
        replacements: { dropId },
        type: sequelize_1.QueryTypes.UPDATE,
        transaction,
    });
}
async function decrementTotalStock(dropId, transaction) {
    await sequelize_js_1.sequelize.query(`UPDATE "Drops"
     SET "totalStock" = "totalStock" - 1, "updatedAt" = NOW()
     WHERE id = :dropId`, {
        replacements: { dropId },
        type: sequelize_1.QueryTypes.UPDATE,
        transaction,
    });
}
//# sourceMappingURL=stock.service.js.map