const express = require('express');
const router = express.Router();
const { searchDishes } = require('../controller/restaurantController');

router.get('/search/dishes', searchDishes);

module.exports = router;

