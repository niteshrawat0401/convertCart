const express = require("express");
const sequelize = require('./db');
const restaurantRoutes = require('./route/restaurantRoutes');
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/", restaurantRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Restaurant Search API. Use /search/dishes?name=biryani&minPrice=150&maxPrice=300");
});

const port = process.env.PORT || 3000;

sequelize
  .sync({ force: false }) // creates tables if not exist
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.log("Error while connecting: " + err));