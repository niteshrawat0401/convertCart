const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const MenuItem = require('./menuItem');
const Restaurant = require('./restaurant');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MenuItem,
      key: 'id'
    }
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Restaurant,
      key: 'id'
    }
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'orders',
  timestamps: false
});

// Define associations
Order.belongsTo(MenuItem, { foreignKey: 'menuItemId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
MenuItem.hasMany(Order, { foreignKey: 'menuItemId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });

module.exports = Order;

