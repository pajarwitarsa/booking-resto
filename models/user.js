'use strict';
const hashPassword = require('../helpers/hashPassword')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Restaurant, {
        through: models.Booking
      })
    }
  };
  User.init({
    first_name: {type: DataTypes.STRING, validate:{
      notEmpty: {msg: 'First Name is required'}
    }},

    last_name: {type: DataTypes.STRING, validate:{
      notEmpty: {msg: 'Last Name is required'}
    }},

    username: {type: DataTypes.STRING, validate:{
      notEmpty: {msg: 'Username is required'}
    }},

    password: {type: DataTypes.STRING, validate:{
      notEmpty: {msg: 'Password is required'}
    }}

  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance,options) => {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};