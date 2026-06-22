import type { Request, Response } from 'express';
import { User } from './user.model.js';

export async function postUser(req: Request, res: Response) {
  try {
    const { username } = req.body;
    if (!username || typeof username !== 'string' || !username.trim()) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'username is required.',
      });
    }

    const trimmedUsername = username.trim().toLowerCase();

    // Find or create the user
    const [user] = await User.findOrCreate({
      where: { username: trimmedUsername },
      defaults: { username: trimmedUsername },
    });

    return res.status(200).json({
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    console.error('Failed to find or create user:', err);
    return res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to find or create user.',
    });
  }
}
