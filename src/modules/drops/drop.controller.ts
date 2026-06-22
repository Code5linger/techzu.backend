import type { Request, Response } from 'express';
import { listDropsWithActivity } from './drop.service.js';
import type { CreateDropInput } from './drop.schema.js';
import { createDrop } from './drop.service.js';

export async function getDrops(_req: Request, res: Response) {
  try {
    const drops = await listDropsWithActivity();
    res.json(drops);
  } catch (err) {
    console.error('Failed to fetch drops:', err);
    res
      .status(500)
      .json({ error: 'INTERNAL_ERROR', message: 'Failed to fetch drops.' });
  }
}

export async function postDrop(req: Request, res: Response) {
  try {
    const input = req.body as CreateDropInput;
    const drop = await createDrop(input);
    res.status(201).json(drop);
  } catch (err) {
    console.error('Failed to create drop:', err);
    res
      .status(500)
      .json({ error: 'INTERNAL_ERROR', message: 'Failed to create drop.' });
  }
}
