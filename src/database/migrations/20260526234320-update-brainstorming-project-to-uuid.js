"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Drop the existing foreign key if it exists
    try {
      await queryInterface.removeConstraint(
        "brainstormings",
        "brainstormings_project_id_fkey",
      );
    } catch (e) {
      // Constraint might not exist yet, continue
    }

    // Step 2: Change column type from STRING to UUID
    await queryInterface.sequelize.query(
      `ALTER TABLE "brainstormings" ALTER COLUMN "project_id" TYPE UUID USING "project_id"::uuid`,
    );

    // Step 3: Add the foreign key constraint
    await queryInterface.addConstraint("brainstormings", {
      fields: ["project_id"],
      type: "foreign key",
      name: "brainstormings_project_id_fkey",
      references: {
        table: "projects",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Step 1: Remove the foreign key constraint
    try {
      await queryInterface.removeConstraint(
        "brainstormings",
        "brainstormings_project_id_fkey",
      );
    } catch (e) {
      // Constraint might not exist, continue
    }

    // Step 2: Change column type from UUID back to STRING
    await queryInterface.sequelize.query(
      `ALTER TABLE "brainstormings" ALTER COLUMN "project_id" TYPE VARCHAR(255)`,
    );
  },
};
