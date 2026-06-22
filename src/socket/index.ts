import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { registerSocketServer } from './stock.socket.js';

export function initSocketServer(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('joinDrop', (dropId: string) => {
      socket.join(dropId);
      console.log(`Socket ${socket.id} joined room ${dropId}`);
    });

    socket.on('leaveDrop', (dropId: string) => {
      socket.leave(dropId);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  registerSocketServer(io);
  return io;
}
