import { z } from 'zod';

export const createPurchaseSchema = z.object({
  userId: z.string().uuid('userId must be a valid UUID'),
});

export type CreatePurchaseInput = z.infer<typeof createPurchaseSchema>;
