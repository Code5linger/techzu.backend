import { sequelize } from '../config/sequelize.js';
import { QueryTypes } from 'sequelize';
import type { Transaction } from 'sequelize';

export async function decrementStockIfAvailable(
  dropId: string,
  transaction?: Transaction,
): Promise<boolean> {
  const [, affectedRows] = await sequelize.query(
    `UPDATE "Drops"
     SET "availableStock" = "availableStock" - 1, "updatedAt" = NOW()
     WHERE id = :dropId AND "availableStock" > 0`,
    {
      replacements: { dropId },
      type: QueryTypes.UPDATE,
      transaction,
    },
  );

  return affectedRows === 1;
}

export async function incrementStock(
  dropId: string,
  transaction?: Transaction,
): Promise<void> {
  await sequelize.query(
    `UPDATE "Drops"
     SET "availableStock" = "availableStock" + 1, "updatedAt" = NOW()
     WHERE id = :dropId`,
    {
      replacements: { dropId },
      type: QueryTypes.UPDATE,
      transaction,
    },
  );
}

export async function decrementTotalStock(
  dropId: string,
  transaction?: Transaction,
): Promise<void> {
  await sequelize.query(
    `UPDATE "Drops"
     SET "totalStock" = "totalStock" - 1, "updatedAt" = NOW()
     WHERE id = :dropId`,
    {
      replacements: { dropId },
      type: QueryTypes.UPDATE,
      transaction,
    },
  );
}
