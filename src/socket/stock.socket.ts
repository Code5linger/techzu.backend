import type { Server } from 'socket.io';

let io: Server | null = null;

export function registerSocketServer(server: Server): void {
  io = server;
}

export function emitStockUpdated(dropId: string): void {
  if (!io) return;
  console.log(`>>> emitStockUpdated called for ${dropId}`);
  io.to(dropId).emit('stock:updated', { dropId });
}

export function emitPurchaseCompleted(
  dropId: string,
  username: string,
  purchasedAt: Date,
): void {
  if (!io) return;
  io.to(dropId).emit('purchase:completed', { dropId, username, purchasedAt });
}
