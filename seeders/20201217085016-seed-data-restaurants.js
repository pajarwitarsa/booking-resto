'use strict';

const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./restaurants.json', 'utf-8'));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', data, {});

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
