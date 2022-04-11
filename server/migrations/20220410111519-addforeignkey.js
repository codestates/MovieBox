'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Comments", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Comments", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_comments_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Comments", "user_id");
  },
};
