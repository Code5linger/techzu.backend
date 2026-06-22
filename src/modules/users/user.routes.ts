import { Router } from 'express';
import { postUser } from './user.controller.js';

export const userRoutes = Router();

userRoutes.post('/users', postUser);
