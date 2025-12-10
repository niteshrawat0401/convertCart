const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'restaurants',
  timestamps: false
});

module.exports = Restaurant;

