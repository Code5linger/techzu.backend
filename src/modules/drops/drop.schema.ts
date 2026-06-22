import { z } from 'zod';

export const createDropSchema = z.object({
  name: z.string().trim().min(1, 'name is required'),
  price: z
    .number()
    .nonnegative('price must be >= 0')
    .or(
      z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, 'price must be a valid decimal string'),
    ),
  totalStock: z
    .number()
    .int()
    .positive('totalStock must be a positive integer'),
  startsAt: z.coerce.date({ message: 'startsAt must be a valid date' }),
});

export type CreateDropInput = z.infer<typeof createDropSchema>;
