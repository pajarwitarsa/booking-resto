'use strict';

const data = [
  {name: 'Open', createdAt: new Date(), updatedAt: new Date()},
  {name: 'Closed', createdAt: new Date(), updatedAt: new Date()},
  {name: 'Confirmed', createdAt: new Date(), updatedAt: new Date()},
  {name: 'Completed', createdAt: new Date(), updatedAt: new Date()}
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
