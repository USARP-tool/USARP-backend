"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop the existing table if it exists
    await queryInterface.dropTable("brainstorming_user_roles", { force: true });

    // Create the table with correct column names (snake_case)
    await queryInterface.createTable("brainstorming_user_roles", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      brainstorming_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "brainstormings",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      role_in_brainstorming: {
        type: Sequelize.ENUM("Moderador", "Participante"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("brainstorming_user_roles");
  },
};
