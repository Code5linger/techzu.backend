import { Router } from 'express';
import { getDrops, postDrop } from './drop.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { createDropSchema } from './drop.schema.js';

export const dropRoutes = Router();

dropRoutes.get('/drops', getDrops);
dropRoutes.get('/drops', getDrops);
dropRoutes.post('/drops', validateRequest(createDropSchema), postDrop);
