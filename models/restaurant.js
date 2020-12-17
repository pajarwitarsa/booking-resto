'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: "RestaurantId"
      })
    }
    generateAmPm(value){
      
      if(value < 13) {
        return value + ' AM';
      } else {
        return value - 12 + ' PM';
      }
    }
  };
  Restaurant.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    opening_hours: DataTypes.INTEGER,
    closing_hours: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};