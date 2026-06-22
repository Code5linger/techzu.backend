import { Drop } from './drop.model.js';
import { Purchase } from '../purchases/purchase.model.js';
import { User } from '../users/user.model.js';
import { Reservation } from '../reservations/reservation.model.js';
import type { CreateDropInput } from './drop.schema.js';

export interface DropActivity {
  username: string;
  type: 'reserved' | 'purchased';
  timestamp: Date;
}

export interface DropWithActivity {
  id: string;
  name: string;
  price: string;
  totalStock: number;
  availableStock: number;
  startsAt: Date;
  recentActivities: DropActivity[];
}

export async function listDropsWithActivity(): Promise<DropWithActivity[]> {
  const drops = await Drop.findAll({
    order: [
      ['createdAt', 'ASC'],
      ['id', 'ASC'],
    ],
  });

  if (drops.length === 0) return [];

  const dropIds = drops.map((d) => d.id);

  const activeReservations = await Reservation.findAll({
    where: { dropId: dropIds, status: 'active' },
    order: [['createdAt', 'DESC']],
    include: [{ model: User, attributes: ['username'] }],
  });

  const purchases = await Purchase.findAll({
    where: { dropId: dropIds },
    order: [['purchasedAt', 'DESC']],
    include: [{ model: User, attributes: ['username'] }],
  });

  const activitiesByDrop = new Map<string, DropActivity[]>();

  const getUsername = (obj: any) => obj.User?.username ?? 'unknown';

  for (const res of activeReservations) {
    const list = activitiesByDrop.get(res.dropId) ?? [];
    list.push({
      username: getUsername(res),
      type: 'reserved',
      timestamp: res.createdAt,
    });
    activitiesByDrop.set(res.dropId, list);
  }

  for (const pur of purchases) {
    const list = activitiesByDrop.get(pur.dropId) ?? [];
    list.push({
      username: getUsername(pur),
      type: 'purchased',
      timestamp: pur.purchasedAt,
    });
    activitiesByDrop.set(pur.dropId, list);
  }

  for (const [dropId, list] of activitiesByDrop.entries()) {
    list.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    activitiesByDrop.set(dropId, list.slice(0, 3));
  }

  return drops.map((drop) => ({
    id: drop.id,
    name: drop.name,
    price: drop.price,
    totalStock: drop.totalStock,
    availableStock: drop.availableStock,
    startsAt: drop.startsAt,
    recentActivities: activitiesByDrop.get(drop.id) ?? [],
  }));
}

export async function createDrop(input: CreateDropInput) {
  const priceAsString =
    typeof input.price === 'number' ? input.price.toFixed(2) : input.price;

  const drop = await Drop.create({
    name: input.name,
    price: priceAsString,
    totalStock: input.totalStock,
    availableStock: input.totalStock,
    startsAt: input.startsAt,
  });

  return drop;
}
