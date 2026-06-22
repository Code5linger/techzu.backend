import { Server } from 'socket.io';
// import type { Server as HttpServer } from 'http';
import { registerSocketServer } from './stock.socket.js';

// export function initSocketServer(httpServer: HttpServer): Server {
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.CLIENT_URL || '*',
//     credentials: true,
//   },
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initSocketServer(httpServer: any) {
  const io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (
          !origin ||
          origin.endsWith('.vercel.app') ||
          origin === 'https://techzu-frontend.vercel.app'
        ) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST'],
      credentials: true,
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
