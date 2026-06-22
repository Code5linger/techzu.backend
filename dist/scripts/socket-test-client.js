"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const dropId = process.argv[2];
if (!dropId) {
    console.error('Usage: tsx src/scripts/socket-test-client.ts <dropId>');
    process.exit(1);
}
const socket = (0, socket_io_client_1.io)('http://localhost:5000');
socket.on('connect', () => {
    console.log(`Connected as ${socket.id}, joining room ${dropId}`);
    socket.emit('joinDrop', dropId);
});
socket.on('stock:updated', (payload) => {
    console.log('>>> stock:updated received:', payload);
});
socket.on('disconnect', () => {
    console.log('Disconnected');
});
//# sourceMappingURL=socket-test-client.js.map