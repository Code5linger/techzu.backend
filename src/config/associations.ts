import { User } from '../modules/users/user.model.js';
import { Drop } from '../modules/drops/drop.model.js';
import { Reservation } from '../modules/reservations/reservation.model.js';
import { Purchase } from '../modules/purchases/purchase.model.js';

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Drop.hasMany(Reservation, { foreignKey: 'dropId' });
Reservation.belongsTo(Drop, { foreignKey: 'dropId' });

User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });

Drop.hasMany(Purchase, { foreignKey: 'dropId' });
Purchase.belongsTo(Drop, { foreignKey: 'dropId' });

Reservation.hasOne(Purchase, { foreignKey: 'reservationId' });
Purchase.belongsTo(Reservation, { foreignKey: 'reservationId' });
