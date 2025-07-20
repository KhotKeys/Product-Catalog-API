# Product Catalog API

A RESTful API for managing product catalogs with full CRUD operations, search, filtering, and inventory management.

## Features

- Product Management (CRUD)
- Category Management
- Search & Filtering
- Inventory Tracking
- Product Variants
- Pricing & Discounts
- Reporting & Analytics

## Tech Stack

- Node.js, Express.js
- MongoDB, Mongoose
- Swagger Documentation
- Input Validation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment:
```bash
cp env.example .env
# Edit .env with your MongoDB URI
```

3. Start the server:
```bash
npm run dev
```

## Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use Error
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:**
- Kill existing Node processes: `taskkill /F /IM node.exe`
- Or change the PORT in `.env` file to a different port (e.g., 3001, 3002)

#### 2. MongoDB Connection Error
```
Error connecting to MongoDB: connect ECONNREFUSED ::1:27017
```
**Solutions:**
- **Option 1 (Recommended for Demo):** Set `USE_MEMORY_DB=true` in `.env` file
- **Option 2:** Install MongoDB locally and start the service
- **Option 3:** Use MongoDB Atlas cloud database

#### 3. Quick Fix Script
Run the automatic fix script:
```bash
node fix-server.js
```

## API Documentation

- Swagger UI: `http://localhost:3002/api-docs`
- Health Check: `http://localhost:3002/health`

## Endpoints

### Categories
- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create category
- `GET /api/v1/categories/:id` - Get category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Products
- `GET /api/v1/products` - Get all products (with filtering)
- `POST /api/v1/products` - Create product
- `GET /api/v1/products/:id` - Get product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product
- `PUT /api/v1/products/:id/inventory` - Update inventory

### Reports
- `GET /api/v1/reports/low-stock` - Low stock report
- `GET /api/v1/reports/inventory-summary` - Inventory summary
- `GET /api/v1/reports/price-range` - Price analytics

## Testing

Use Postman or any REST client to test the API endpoints.

## Project Structure

```
src/
├── controllers/     # Route controllers
├── models/         # Mongoose models
├── routes/         # API routes
├── middleware/     # Custom middleware
└── docs/          # Swagger docs
```