# 📮 Complete Postman Testing Guide for Product Catalog API

## 🚀 Quick Setup

### 1. Base Configuration
- **Base URL**: `http://localhost:3002`
- **API Version**: `/api/v1`
- **Content-Type**: `application/json` (for POST/PUT requests)

### 2. Import the Postman Collection
The project includes a Postman collection file: `Product_Catalog_API.postman_collection.json`

**To import:**
1. Open Postman
2. Click "Import" button (top left)
3. Select the `Product_Catalog_API.postman_collection.json` file
4. Click "Import"

---

## 🎯 Step-by-Step Testing Sequence

### Phase 1: Initial Setup and Health Check

#### 1. Health Check
```
Method: GET
URL: http://localhost:3002/health
Headers: None needed
Body: None
Expected Response: 200 OK with server status
```

#### 2. Seed Database with Sample Data
```
Method: POST
URL: http://localhost:3002/api/v1/seed
Headers: Content-Type: application/json
Body: None (empty)
Expected Response: 201 Created with confirmation message
```

---

### Phase 2: Category Management (8 Endpoints)

#### 3. Get All Categories
```
Method: GET
URL: http://localhost:3002/api/v1/categories
Headers: None needed
Body: None
Expected Response: 200 OK with array of categories
```

#### 4. Create New Category
```
Method: POST
URL: http://localhost:3002/api/v1/categories
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "Gaming Accessories",
  "description": "All gaming related accessories and peripherals"
}
Expected Response: 201 Created with new category object
```

#### 5. Get Category by ID
```
Method: GET
URL: http://localhost:3002/api/v1/categories/{categoryId}
Headers: None needed
Body: None
Note: Replace {categoryId} with actual ID from previous responses
Expected Response: 200 OK with category details
```

#### 6. Update Category
```
Method: PUT
URL: http://localhost:3002/api/v1/categories/{categoryId}
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "Updated Gaming Accessories",
  "description": "Updated description for gaming accessories"
}
Expected Response: 200 OK with updated category
```

#### 7. Search Categories
```
Method: GET
URL: http://localhost:3002/api/v1/categories?search=gaming
Headers: None needed
Body: None
Expected Response: 200 OK with filtered categories
```

#### 8. Get Categories with Pagination
```
Method: GET
URL: http://localhost:3002/api/v1/categories?page=1&limit=2
Headers: None needed
Body: None
Expected Response: 200 OK with paginated results
```

#### 9. Get Category Statistics
```
Method: GET
URL: http://localhost:3002/api/v1/categories/stats
Headers: None needed
Body: None
Expected Response: 200 OK with category statistics
```

#### 10. Delete Category (Test last - will only work for categories with no products)
```
Method: DELETE
URL: http://localhost:3002/api/v1/categories/{categoryId}
Headers: None needed
Body: None
Expected Response: 200 OK if successful, 400 if category has products
```

---

### Phase 3: Product Management (10 Endpoints)

#### 11. Get All Products
```
Method: GET
URL: http://localhost:3002/api/v1/products
Headers: None needed
Body: None
Expected Response: 200 OK with array of products
```

#### 12. Create New Product
```
Method: POST
URL: http://localhost:3002/api/v1/products
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "Wireless Gaming Mouse",
  "description": "High-precision wireless gaming mouse with RGB lighting",
  "price": 79.99,
  "category": "{categoryId}",
  "sku": "WGM-001",
  "stock": 50,
  "variants": [
    {
      "name": "Black",
      "price": 79.99,
      "stock": 30
    },
    {
      "name": "White",
      "price": 84.99,
      "stock": 20
    }
  ]
}
Note: Replace {categoryId} with actual category ID
Expected Response: 201 Created with new product object
```

#### 13. Get Product by ID
```
Method: GET
URL: http://localhost:3002/api/v1/products/{productId}
Headers: None needed
Body: None
Expected Response: 200 OK with product details including category info
```

#### 14. Update Product
```
Method: PUT
URL: http://localhost:3002/api/v1/products/{productId}
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "Updated Wireless Gaming Mouse",
  "price": 89.99,
  "stock": 45
}
Expected Response: 200 OK with updated product
```

#### 15. Search Products by Name
```
Method: GET
URL: http://localhost:3002/api/v1/products?search=mouse
Headers: None needed
Body: None
Expected Response: 200 OK with filtered products
```

#### 16. Filter Products by Category
```
Method: GET
URL: http://localhost:3002/api/v1/products?category={categoryId}
Headers: None needed
Body: None
Expected Response: 200 OK with products from specific category
```

#### 17. Filter Products by Price Range
```
Method: GET
URL: http://localhost:3002/api/v1/products?minPrice=50&maxPrice=100
Headers: None needed
Body: None
Expected Response: 200 OK with products in price range
```

#### 18. Get Products with Pagination
```
Method: GET
URL: http://localhost:3002/api/v1/products?page=1&limit=3
Headers: None needed
Body: None
Expected Response: 200 OK with paginated results
```

#### 19. Update Product Stock
```
Method: PATCH
URL: http://localhost:3002/api/v1/products/{productId}/stock
Headers: Content-Type: application/json
Body (raw JSON):
{
  "stock": 100
}
Expected Response: 200 OK with updated stock
```

#### 20. Delete Product
```
Method: DELETE
URL: http://localhost:3002/api/v1/products/{productId}
Headers: None needed
Body: None
Expected Response: 200 OK with confirmation message
```

---

### Phase 4: Reports and Analytics (3 Endpoints)

#### 21. Get Products Report
```
Method: GET
URL: http://localhost:3002/api/v1/reports/products
Headers: None needed
Body: None
Expected Response: 200 OK with product analytics
```

#### 22. Get Categories Report
```
Method: GET
URL: http://localhost:3002/api/v1/reports/categories
Headers: None needed
Body: None
Expected Response: 200 OK with category analytics
```

#### 23. Get Inventory Report
```
Method: GET
URL: http://localhost:3002/api/v1/reports/inventory
Headers: None needed
Body: None
Expected Response: 200 OK with inventory analytics
```

---

### Phase 5: Utility Endpoints (3 Endpoints)

#### 24. Reset Database
```
Method: DELETE
URL: http://localhost:3002/api/v1/reset
Headers: None needed
Body: None
Expected Response: 200 OK with reset confirmation
Warning: This will delete all data!
```

---

## 🔧 Common Postman Configuration Issues & Solutions

### Issue 1: "Cannot POST" or "Cannot GET" Errors
**Solution**: 
- Ensure server is running on port 3002
- Check URL format: `http://localhost:3002/api/v1/...`
- Verify HTTP method is correct

### Issue 2: 400 Bad Request on POST/PUT
**Solution**:
1. Set `Content-Type: application/json` in Headers tab
2. Select "raw" in Body tab
3. Select "JSON" from dropdown (not "Text")
4. Ensure JSON is properly formatted (use JSON validator)

### Issue 3: 404 Not Found for ID-based requests
**Solution**:
- Copy actual ObjectId from previous responses
- Don't use placeholder text like "{categoryId}"
- ObjectIds are 24-character hex strings

### Issue 4: 500 Internal Server Error
**Solution**:
- Check server terminal for detailed error messages
- Ensure required fields are provided
- Verify data types match schema requirements

---

## 📋 Postman Environment Setup (Optional but Recommended)

Create a Postman Environment with these variables:
- `baseUrl`: `http://localhost:3002`
- `apiVersion`: `/api/v1`
- `categoryId`: (update after creating categories)
- `productId`: (update after creating products)

This allows you to use `{{baseUrl}}{{apiVersion}}/categories` instead of full URLs.

---

## 🎬 Demo Testing Sequence (7-minute walkthrough)

1. **Setup** (30 seconds): Health check + Seed database
2. **Categories** (2 minutes): Create, list, search, update
3. **Products** (3 minutes): Create with variants, list, filter by category/price, update stock
4. **Reports** (1 minute): Show analytics for products, categories, inventory
5. **Cleanup** (30 seconds): Delete test data

---

## 📊 Expected Response Codes

- **200 OK**: Successful GET, PUT, PATCH, DELETE operations
- **201 Created**: Successful POST operations (creating new resources)
- **400 Bad Request**: Invalid data, missing required fields, validation errors
- **404 Not Found**: Resource doesn't exist, invalid ObjectId
- **500 Internal Server Error**: Server-side issues, database connection problems

---

## 🚨 Important Testing Notes

1. **Database Resets**: Memory database resets when server restarts
2. **ObjectId Format**: Use actual 24-character hex IDs from responses
3. **Required Headers**: Always set `Content-Type: application/json` for POST/PUT
4. **Data Relationships**: Categories with products cannot be deleted
5. **Validation**: API enforces required fields and data types

---

Ready to test! 🚀 Your API is running at: http://localhost:3002
Documentation available at: http://localhost:3002/api-docs
