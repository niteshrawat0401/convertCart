# Restaurant Search API

A Node.js backend service that allows users to search for restaurants based on dish names with mandatory price range filtering. The system stores restaurants, their menu items, and orders, returning the top 10 restaurants where a dish has been ordered the most within a specified price range.

## Features

- Search restaurants by dish name
- Filter results by mandatory price range (minPrice and maxPrice)
- Returns top 10 restaurants ordered by order count
- Each result includes restaurant details, dish name, dish price, and total order count

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL** - Database

## Prerequisites

- Node.js (v14 or higher)
- MySQL database (local or remote)
- npm or yarn package manager

## Installation

1. Clone the repository or navigate to the project directory:
```bash
cd convertCart
```

2. Install dependencies:
```bash
npm install
```

## Database Configuration

Update the database configuration in `db.js`:

```javascript
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'your-mysql-host',
  username: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
  port: your-port-number
});
```

**Note:** The current configuration uses an Aiven cloud MySQL instance. Update it with your database credentials.

## Setup Database

1. Make sure your MySQL database is running and accessible.

2. Seed the database with sample data:
```bash
node seed.js
```

This will:
- Create all necessary tables (restaurants, menu_items, orders)
- Insert sample restaurants, menu items, and orders
- Display a success message when complete

## Running the Server

Start the development server:
```bash
npm run dev
```

Or start the server normally:
```bash
node index.js
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### Search Dishes

Search for restaurants by dish name with price range filtering.

**Endpoint:** `GET /search/dishes`

**Query Parameters:**
- `name` (required) - Dish name to search for (case-insensitive partial match)
- `minPrice` (required) - Minimum price filter
- `maxPrice` (required) - Maximum price filter

**Example Request:**
```bash
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300
```

**Example Response:**
```json
{
  "restaurants": [
    {
      "restaurantId": 1,
      "restaurantName": "Hyderabadi Spice House",
      "city": "Hyderabad",
      "dishName": "Chicken Biryani",
      "dishPrice": 220,
      "orderCount": 96
    },
    {
      "restaurantId": 2,
      "restaurantName": "Delhi Darbar",
      "city": "Delhi",
      "dishName": "Chicken Biryani",
      "dishPrice": 250,
      "orderCount": 85
    }
  ]
}
```

**Response Details:**
- Returns top 10 restaurants where the dish has been ordered the most
- Only includes restaurants where the dish price falls within the specified range
- Results are sorted by order count in descending order

**Error Responses:**

1. Missing dish name:
```json
{
  "error": "Dish name is required"
}
```

2. Missing price parameters:
```json
{
  "error": "Both minPrice and maxPrice are required"
}
```

3. Invalid price values:
```json
{
  "error": "minPrice and maxPrice must be valid numbers"
}
```

4. Invalid price range:
```json
{
  "error": "minPrice must be less than or equal to maxPrice"
}
```

## Project Structure

```
convertCart/
├── controller/
│   └── restaurantController.js    # Search logic and validation
├── model/
│   ├── restaurant.js              # Restaurant model
│   ├── menuItem.js                # Menu item model
│   └── order.js                   # Order model
├── route/
│   └── restaurantRoutes.js        # API routes
├── db.js                          # Database configuration
├── index.js                       # Main server file
├── seed.js                        # Database seeding script
├── package.json                   # Dependencies
└── README.md                      # This file
```

## Data Model

### Restaurant
- `id` (Primary Key)
- `restaurantName`
- `city`

### MenuItem
- `id` (Primary Key)
- `restaurantId` (Foreign Key)
- `dishName`
- `dishPrice`

### Order
- `id` (Primary Key)
- `menuItemId` (Foreign Key)
- `restaurantId` (Foreign Key)
- `orderDate`

**Note:** For simplicity, each order contains only one item.

## Testing the API

### Using cURL:
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

### Using Browser:
Navigate to:
```
http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

### Using Postman:
1. Create a new GET request
2. URL: `http://localhost:3000/search/dishes`
3. Add query parameters:
   - `name`: biryani
   - `minPrice`: 150
   - `maxPrice`: 300

## Sample Data

The seed file creates:
- 12 restaurants across different cities
- Multiple menu items (biryani variants) with different prices
- Orders distributed across restaurants to demonstrate the ranking functionality

## Notes

- The search uses a `LIKE` query with `%name%` pattern matching (case-insensitive)
- Price filtering is inclusive (uses BETWEEN)
- Results are limited to top 10 restaurants
- Order count represents the total number of orders for that specific dish in that restaurant

## Troubleshooting

1. **Database Connection Error:**
   - Verify database credentials in `db.js`
   - Ensure MySQL server is running
   - Check network connectivity if using remote database

2. **Tables Not Created:**
   - Run `node seed.js` to create tables and seed data
   - Check database permissions

3. **No Results Returned:**
   - Verify seed data was inserted correctly
   - Check if dish names match (case-insensitive partial match)
   - Ensure price range includes dish prices in the database

## License

ISC

