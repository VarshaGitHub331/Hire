"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Gigs", "gig_id", {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Gigs", "gig_id", {
      type: Sequelize.INTEGER,

      autoIncrement: false,
    });
  },
};
