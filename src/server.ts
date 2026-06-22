import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { initSocketServer } from './socket/index.js';
import { startExpirationSweep } from './jobs/expiration.job.js';

const httpServer = http.createServer(app);
initSocketServer(httpServer);

const bootstrap = () => {
  try {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
      startExpirationSweep();
    });
  } catch (error) {
    console.log(`Failed to start server! Cause of: ${error}`);
  }
};

bootstrap();
