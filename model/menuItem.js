const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Restaurant = require('./restaurant');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Restaurant,
      key: 'id'
    }
  },
  dishName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dishPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'menu_items',
  timestamps: false
});

// Define associations
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId' });

module.exports = MenuItem;

