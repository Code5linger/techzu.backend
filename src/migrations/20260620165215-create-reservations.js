'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
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
      status: {
        type: Sequelize.ENUM('active', 'purchased', 'expired'),
        allowNull: false,
        defaultValue: 'active',
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('Reservations', ['status', 'expiresAt'], {
      name: 'reservations_status_expires_at_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Reservations');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Reservations_status";',
    );
  },
};
