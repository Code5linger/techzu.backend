import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/users/user.routes';

import './config/associations.js';
import { reservationRoutes } from './modules/reservations/reservation.routes';
import { purchaseRoutes } from './modules/purchases/purchase.routes';
import { dropRoutes } from './modules/drops/drop.routes.js';

const app: Application = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.use('/api', dropRoutes);
app.use('/api', userRoutes);
app.use('/api', reservationRoutes);
app.use('/api', purchaseRoutes);

export default app;
