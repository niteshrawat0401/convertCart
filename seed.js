const sequelize = require('./db');
const Restaurant = require('./model/restaurant');
const MenuItem = require('./model/menuItem');
const Order = require('./model/order');

const seedDatabase = async () => {
  try {
    // Sync database (create tables)
    await sequelize.sync({ force: true });
    console.log('Database tables created');

    // Create Restaurants
    const restaurants = await Restaurant.bulkCreate([
      { restaurantName: 'Hyderabadi Spice House', city: 'Hyderabad' },
      { restaurantName: 'Delhi Darbar', city: 'Delhi' },
      { restaurantName: 'Mumbai Masala', city: 'Mumbai' },
      { restaurantName: 'Bengal Biryani', city: 'Kolkata' },
      { restaurantName: 'Royal Kitchen', city: 'Bangalore' },
      { restaurantName: 'Spice Garden', city: 'Chennai' },
      { restaurantName: 'Tandoor Express', city: 'Pune' },
      { restaurantName: 'Curry House', city: 'Jaipur' },
      { restaurantName: 'Biryani Paradise', city: 'Hyderabad' },
      { restaurantName: 'Flavors of India', city: 'Delhi' },
      { restaurantName: 'Coastal Delights', city: 'Mumbai' },
      { restaurantName: 'North Indian Kitchen', city: 'Delhi' }
    ]);
    console.log('Restaurants created');

    // Create Menu Items
    const menuItems = await MenuItem.bulkCreate([
      // Hyderabadi Spice House
      { restaurantId: 1, dishName: 'Chicken Biryani', dishPrice: 220 },
      { restaurantId: 1, dishName: 'Mutton Biryani', dishPrice: 280 },
      { restaurantId: 1, dishName: 'Veg Biryani', dishPrice: 150 },
      { restaurantId: 1, dishName: 'Egg Biryani', dishPrice: 180 },
      
      // Delhi Darbar
      { restaurantId: 2, dishName: 'Chicken Biryani', dishPrice: 250 },
      { restaurantId: 2, dishName: 'Mutton Biryani', dishPrice: 300 },
      { restaurantId: 2, dishName: 'Paneer Biryani', dishPrice: 200 },
      
      // Mumbai Masala
      { restaurantId: 3, dishName: 'Chicken Biryani', dishPrice: 240 },
      { restaurantId: 3, dishName: 'Fish Biryani', dishPrice: 260 },
      { restaurantId: 3, dishName: 'Veg Biryani', dishPrice: 160 },
      
      // Bengal Biryani
      { restaurantId: 4, dishName: 'Chicken Biryani', dishPrice: 230 },
      { restaurantId: 4, dishName: 'Mutton Biryani', dishPrice: 290 },
      { restaurantId: 4, dishName: 'Egg Biryani', dishPrice: 170 },
      
      // Royal Kitchen
      { restaurantId: 5, dishName: 'Chicken Biryani', dishPrice: 210 },
      { restaurantId: 5, dishName: 'Prawn Biryani', dishPrice: 270 },
      { restaurantId: 5, dishName: 'Veg Biryani', dishPrice: 155 },
      
      // Spice Garden
      { restaurantId: 6, dishName: 'Chicken Biryani', dishPrice: 225 },
      { restaurantId: 6, dishName: 'Mutton Biryani', dishPrice: 285 },
      
      // Tandoor Express
      { restaurantId: 7, dishName: 'Chicken Biryani', dishPrice: 235 },
      { restaurantId: 7, dishName: 'Veg Biryani', dishPrice: 165 },
      
      // Curry House
      { restaurantId: 8, dishName: 'Chicken Biryani', dishPrice: 245 },
      { restaurantId: 8, dishName: 'Mutton Biryani', dishPrice: 295 },
      
      // Biryani Paradise
      { restaurantId: 9, dishName: 'Chicken Biryani', dishPrice: 215 },
      { restaurantId: 9, dishName: 'Mutton Biryani', dishPrice: 275 },
      { restaurantId: 9, dishName: 'Veg Biryani', dishPrice: 145 },
      
      // Flavors of India
      { restaurantId: 10, dishName: 'Chicken Biryani', dishPrice: 255 },
      { restaurantId: 10, dishName: 'Paneer Biryani', dishPrice: 195 },
      
      // Coastal Delights
      { restaurantId: 11, dishName: 'Fish Biryani', dishPrice: 265 },
      { restaurantId: 11, dishName: 'Prawn Biryani', dishPrice: 275 },
      
      // North Indian Kitchen
      { restaurantId: 12, dishName: 'Chicken Biryani', dishPrice: 200 },
      { restaurantId: 12, dishName: 'Mutton Biryani', dishPrice: 250 }
    ]);
    console.log('Menu items created');

    // Create Orders - Generate orders for different restaurants
    // More orders for popular restaurants to show top results
    const orders = [];
    
    // Function to generate random orders
    const generateOrders = (menuItemId, restaurantId, count) => {
      for (let i = 0; i < count; i++) {
        orders.push({
          menuItemId,
          restaurantId,
          orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date in last 30 days
        });
      }
    };

    // Use actual IDs from created menu items and restaurants

    // Generate orders - Restaurant 1 (Hyderabadi Spice House) - Chicken Biryani (220) - 96 orders
    generateOrders(menuItems[0].id, restaurants[0].id, 96);
    
    // Restaurant 2 (Delhi Darbar) - Chicken Biryani (250) - 85 orders
    generateOrders(menuItems[4].id, restaurants[1].id, 85);
    
    // Restaurant 3 (Mumbai Masala) - Chicken Biryani (240) - 78 orders
    generateOrders(menuItems[7].id, restaurants[2].id, 78);
    
    // Restaurant 4 (Bengal Biryani) - Chicken Biryani (230) - 72 orders
    generateOrders(menuItems[10].id, restaurants[3].id, 72);
    
    // Restaurant 5 (Royal Kitchen) - Chicken Biryani (210) - 65 orders
    generateOrders(menuItems[13].id, restaurants[4].id, 65);
    
    // Restaurant 6 (Spice Garden) - Chicken Biryani (225) - 58 orders
    generateOrders(menuItems[16].id, restaurants[5].id, 58);
    
    // Restaurant 7 (Tandoor Express) - Chicken Biryani (235) - 52 orders
    generateOrders(menuItems[18].id, restaurants[6].id, 52);
    
    // Restaurant 8 (Curry House) - Chicken Biryani (245) - 48 orders
    generateOrders(menuItems[20].id, restaurants[7].id, 48);
    
    // Restaurant 9 (Biryani Paradise) - Chicken Biryani (215) - 45 orders
    generateOrders(menuItems[22].id, restaurants[8].id, 45);
    
    // Restaurant 10 (Flavors of India) - Chicken Biryani (255) - 42 orders
    generateOrders(menuItems[25].id, restaurants[9].id, 42);
    
    // Restaurant 12 (North Indian Kitchen) - Chicken Biryani (200) - 38 orders
    generateOrders(menuItems[29].id, restaurants[11].id, 38);
    
    // Add some orders for other dishes in price range 150-300
    // Restaurant 1 - Mutton Biryani (280) - 30 orders
    generateOrders(menuItems[1].id, restaurants[0].id, 30);
    
    // Restaurant 1 - Veg Biryani (150) - 25 orders
    generateOrders(menuItems[2].id, restaurants[0].id, 25);
    
    // Restaurant 2 - Mutton Biryani (300) - 28 orders
    generateOrders(menuItems[5].id, restaurants[1].id, 28);
    
    // Restaurant 3 - Fish Biryani (260) - 22 orders
    generateOrders(menuItems[8].id, restaurants[2].id, 22);
    
    // Restaurant 4 - Mutton Biryani (290) - 20 orders
    generateOrders(menuItems[11].id, restaurants[3].id, 20);
    
    // Restaurant 5 - Prawn Biryani (270) - 18 orders
    generateOrders(menuItems[14].id, restaurants[4].id, 18);
    
    // Restaurant 6 - Mutton Biryani (285) - 15 orders
    generateOrders(menuItems[17].id, restaurants[5].id, 15);
    
    // Restaurant 9 - Mutton Biryani (275) - 12 orders
    generateOrders(menuItems[23].id, restaurants[8].id, 12);
    
    // Restaurant 9 - Veg Biryani (145) - 10 orders (outside 150-300 range, won't show)
    generateOrders(menuItems[24].id, restaurants[8].id, 10);

    await Order.bulkCreate(orders);
    console.log(`Orders created: ${orders.length}`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample query: /search/dishes?name=biryani&minPrice=150&maxPrice=300');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

