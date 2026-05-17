"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE enum_projects_status ADD VALUE IF NOT EXISTS 'Ativo';
      ALTER TYPE enum_projects_status ADD VALUE IF NOT EXISTS 'Bloqueado';
      ALTER TYPE enum_projects_status ADD VALUE IF NOT EXISTS 'Concluído/Encerrado';
    `);
  },

  async down(queryInterface, Sequelize) {
    // PostgreSQL does not support removing enum values directly.
    // Rolling back this migration is not safe without recreating the enum type.
  },
};
