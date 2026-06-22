import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { dropRoutes } from './modules/drops/drop.routes';
import { userRoutes } from './modules/users/user.routes';

import './config/associations.js';
import { reservationRoutes } from './modules/reservations/reservation.routes';
import { purchaseRoutes } from './modules/purchases/purchase.routes';
console.log('Associations loaded');

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.use('/api', dropRoutes);
app.use('/api', userRoutes);
app.use('/api', reservationRoutes);
app.use('/api', purchaseRoutes);

export default app;
