"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = initSocketServer;
const socket_io_1 = require("socket.io");
const stock_socket_js_1 = require("./stock.socket.js");
function initSocketServer(httpServer) {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*',
        },
    });
    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on('joinDrop', (dropId) => {
            socket.join(dropId);
            console.log(`Socket ${socket.id} joined room ${dropId}`);
        });
        socket.on('leaveDrop', (dropId) => {
            socket.leave(dropId);
        });
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
    (0, stock_socket_js_1.registerSocketServer)(io);
    return io;
}
//# sourceMappingURL=index.js.map