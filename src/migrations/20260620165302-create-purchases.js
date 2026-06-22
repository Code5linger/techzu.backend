'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Purchases', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      dropId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Drops', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      reservationId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'Reservations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      purchasedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('Purchases', ['dropId', 'purchasedAt'], {
      name: 'purchases_drop_purchased_at_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Purchases');
  },
};
