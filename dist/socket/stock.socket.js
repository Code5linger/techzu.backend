"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketServer = registerSocketServer;
exports.emitStockUpdated = emitStockUpdated;
exports.emitPurchaseCompleted = emitPurchaseCompleted;
let io = null;
function registerSocketServer(server) {
    io = server;
}
function emitStockUpdated(dropId) {
    if (!io)
        return;
    console.log(`>>> emitStockUpdated called for ${dropId}`);
    io.to(dropId).emit('stock:updated', { dropId });
}
function emitPurchaseCompleted(dropId, username, purchasedAt) {
    if (!io)
        return;
    io.to(dropId).emit('purchase:completed', { dropId, username, purchasedAt });
}
//# sourceMappingURL=stock.socket.js.map