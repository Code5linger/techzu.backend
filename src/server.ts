import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { initSocketServer } from './socket/index.js';
import { startExpirationSweep } from './jobs/expiration.job.js';

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);
initSocketServer(httpServer);

httpServer.listen(PORT, () => {
  startExpirationSweep();
});
