import { z } from 'zod';

export const createReservationSchema = z.object({
  userId: z.string().uuid('userId must be a valid UUID'),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
