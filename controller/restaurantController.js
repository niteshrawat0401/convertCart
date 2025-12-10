const { Op } = require('sequelize');
const sequelize = require('../db');
const Restaurant = require('../model/restaurant');
const MenuItem = require('../model/menuItem');
const Order = require('../model/order');

const searchDishes = async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;

    // Validate required parameters
    if (!name) {
      return res.status(400).json({ error: 'Dish name is required' });
    }

    if (!minPrice || !maxPrice) {
      return res.status(400).json({ 
        error: 'Both minPrice and maxPrice are required' 
      });
    }

    const minPriceNum = parseFloat(minPrice);
    const maxPriceNum = parseFloat(maxPrice);

    if (isNaN(minPriceNum) || isNaN(maxPriceNum)) {
      return res.status(400).json({ 
        error: 'minPrice and maxPrice must be valid numbers' 
      });
    }

    if (minPriceNum < 0 || maxPriceNum < 0) {
      return res.status(400).json({ 
        error: 'Prices must be non-negative' 
      });
    }

    if (minPriceNum > maxPriceNum) {
      return res.status(400).json({ 
        error: 'minPrice must be less than or equal to maxPrice' 
      });
    }

    // ORM way: aggregate orders grouped by restaurant and menu item
    const results = await Order.findAll({
      attributes: [
        'restaurantId',
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'orderCount']
      ],
      include: [
        {
          model: MenuItem,
          attributes: ['dishName', 'dishPrice'],
          where: {
            dishName: { [Op.like]: `%${name}%` },
            dishPrice: { [Op.between]: [minPriceNum, maxPriceNum] }
          },
          required: true
        },
        {
          model: Restaurant,
          attributes: ['restaurantName', 'city'],
          required: true
        }
      ],
      group: ['restaurantId', 'MenuItem.id', 'Restaurant.id'],
      order: [[sequelize.literal('orderCount'), 'DESC']],
      limit: 10,
      raw: false
    });

    // Format the response
    const restaurants = results.map(result => {
      const menuItem = result.MenuItem;
      const restaurant = result.Restaurant;

      return {
        restaurantId: restaurant.id,
        restaurantName: restaurant.restaurantName,
        city: restaurant.city,
        dishName: menuItem.dishName,
        dishPrice: parseFloat(menuItem.dishPrice),
        orderCount: parseInt(result.get('orderCount'), 10)
      };
    });

    res.json({ restaurants });
  } catch (error) {
    console.error('Error searching dishes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  searchDishes
};

