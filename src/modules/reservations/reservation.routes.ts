import { Router } from 'express';
import { postReservation } from './reservation.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { createReservationSchema } from './reservation.schema.js';

export const reservationRoutes = Router();

reservationRoutes.post(
  '/drops/:dropId/reserve',
  validateRequest(createReservationSchema),
  postReservation,
);
