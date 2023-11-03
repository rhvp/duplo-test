'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('user', {
      id: {
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      first_name: Sequelize.STRING(200),
      last_name: Sequelize.STRING(200),
      email: Sequelize.STRING(200),
      phone: Sequelize.STRING(200),
      business_id: Sequelize.UUID,
      department: Sequelize.STRING(200),
      password: Sequelize.STRING(200),
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('user');
  }
};
