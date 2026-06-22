import { Router } from 'express';
import { postPurchase } from './purchase.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { createPurchaseSchema } from './purchase.schema.js';

export const purchaseRoutes = Router();

purchaseRoutes.post(
  '/reservations/:reservationId/purchase',
  validateRequest(createPurchaseSchema),
  postPurchase,
);
