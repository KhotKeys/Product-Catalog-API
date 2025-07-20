# 📮 Postman Quick Reference - Ready-to-Use Examples

## 🚀 Your API is READY!
**Server Running**: http://localhost:3002  
**Database**: ✅ Seeded with sample data  
**Status**: Ready for Postman testing

---

## 🎯 Essential Postman Tests (Copy-Paste Ready)

### 1. 🏥 Health Check
```
Method: GET
URL: http://localhost:3002/health
Headers: (none needed)
Expected: 200 OK
```

### 2. 📂 Get All Categories
```
Method: GET
URL: http://localhost:3002/api/v1/categories
Headers: (none needed)
Expected: Array of 4 categories
```

### 3. ➕ Create New Category
```
Method: POST
URL: http://localhost:3002/api/v1/categories
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "Test Category",
  "description": "This is a test category created via Postman"
}
Expected: 201 Created with new category
```

### 4. 📦 Get All Products
```
Method: GET
URL: http://localhost:3002/api/v1/products
Headers: (none needed)
Expected: Array of 6 products
```

### 5. 🎮 Create New Product (Gaming Mouse Example)
```
Method: POST
URL: http://localhost:3002/api/v1/products
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "RGB Gaming Mouse",
  "description": "Wireless gaming mouse with customizable RGB lighting",
  "price": 89.99,
  "category": "687d2c1ebc8b84f22deb3ce1",
  "sku": "RGB-MOUSE-001",
  "stock": 25,
  "variants": [
    {
      "name": "Black Edition",
      "price": 89.99,
      "stock": 15
    },
    {
      "name": "White Edition", 
      "price": 94.99,
      "stock": 10
    }
  ]
}
Expected: 201 Created with new product
```

### 6. 🔍 Search Products
```
Method: GET
URL: http://localhost:3002/api/v1/products?search=laptop
Headers: (none needed)
Expected: Products containing "laptop"
```

### 7. 💰 Filter by Price Range
```
Method: GET
URL: http://localhost:3002/api/v1/products?minPrice=500&maxPrice=1500
Headers: (none needed)
Expected: Products between $500-$1500
```

### 8. 📊 Get Reports
```
Method: GET
URL: http://localhost:3002/api/v1/reports/products
Headers: (none needed)
Expected: Product analytics and statistics
```

---

## 🆔 Working Object IDs (From Current Database)

**Note**: These IDs are valid right now. Copy them for testing:

### Categories (use these for product creation):
- Electronics: `687d2c1ebc8b84f22deb3ce1`
- Clothing: `687d2c1ebc8b84f22deb3ce2` 
- Books: `687d2c1ebc8b84f22deb3ce3`
- Sports: `687d2c1ebc8b84f22deb3ce4`

### Products (use these for updates/deletes):
- Gaming Laptop: `687d2c1ebc8b84f22deb3ce5`
- Wireless Headphones: `687d2c1ebc8b84f22deb3ce6`
- Running Shoes: `687d2c1ebc8b84f22deb3ce7`

---

## ⚡ Rapid Testing Sequence (3 minutes)

### Phase 1: Quick Validation (30 seconds)
1. GET `/health` ✅
2. GET `/api/v1/categories` ✅
3. GET `/api/v1/products` ✅

### Phase 2: Create Operations (1 minute)
4. POST new category (use JSON above) ✅
5. POST new product (use JSON above) ✅

### Phase 3: Advanced Features (1.5 minutes)
6. GET products with search: `?search=laptop` ✅
7. GET products by price: `?minPrice=500&maxPrice=1500` ✅
8. GET reports: `/api/v1/reports/products` ✅

---

## 🔧 Postman Configuration Checklist

### For POST/PUT Requests:
1. ✅ Select "POST" or "PUT" method
2. ✅ Enter correct URL
3. ✅ Go to "Headers" tab
4. ✅ Add: `Content-Type` = `application/json`
5. ✅ Go to "Body" tab
6. ✅ Select "raw" radio button
7. ✅ Select "JSON" from dropdown (not "Text")
8. ✅ Paste JSON payload
9. ✅ Click "Send"

### For GET Requests:
1. ✅ Select "GET" method
2. ✅ Enter URL with any query parameters
3. ✅ No headers or body needed
4. ✅ Click "Send"

---

## 🚨 Common Postman Issues & Quick Fixes

### ❌ Issue: "Cannot POST /api/v1/categories"
**✅ Fix**: Server not running. Start with `node server.js`

### ❌ Issue: 400 Bad Request on POST
**✅ Fix**: 
- Set `Content-Type: application/json` in Headers
- Select "JSON" format in Body tab
- Check JSON syntax with validator

### ❌ Issue: "Cast to ObjectId failed"
**✅ Fix**: Use actual 24-character IDs from responses, not placeholder text

### ❌ Issue: Empty response or null data
**✅ Fix**: Database needs seeding. POST to `/api/v1/seed`

---

## 📱 Postman Collection Import

Your project includes: `Product_Catalog_API.postman_collection.json`

**To import**:
1. Open Postman
2. Click "Import" (top left)
3. Select the collection file
4. All 24 endpoints will be imported automatically!

---

## 🎬 7-Minute Demo Script

**Minute 1**: Import collection, health check, show seeded data  
**Minute 2**: Create category, demonstrate validation  
**Minute 3**: Create product with variants  
**Minute 4**: Search and filter products  
**Minute 5**: Update operations (category, product, stock)  
**Minute 6**: Show reports and analytics  
**Minute 7**: Q&A and wrap-up

---

## 📞 Need Help?

1. **Check server**: http://localhost:3002/health
2. **View docs**: http://localhost:3002/api-docs  
3. **Reset data**: POST to `/api/v1/reset`
4. **Reseed data**: POST to `/api/v1/seed`

**Ready to test! 🚀**
