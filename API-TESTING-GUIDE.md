# Quick Reference for API Testing

## 🎯 **GET /api/v1/products - Common Test Cases**

### **Basic Tests (No Parameters):**
```
GET /api/v1/products
```

### **Search Tests:**
- **Search for phones:** `search=phone` or `search=iPhone`
- **Search for laptops:** `search=laptop` or `search=MacBook`
- **Search for books:** `search=book` or `search=JavaScript`
- **Search for clothing:** `search=Nike` or `search=shoes`

### **Pagination Tests:**
- **First page:** `page=1&limit=5`
- **Second page:** `page=2&limit=5`
- **Different limits:** `limit=2`, `limit=10`, `limit=20`

### **Category Filter (IMPORTANT - Use ObjectId, not name):**
⚠️ **Don't use:** `category=Electronics` or `category=Samsung`
✅ **Use:** `category=ACTUAL_CATEGORY_ID_FROM_DATABASE`

## 📋 **Correct Input Examples:**

### **Test 1: Search for phones**
```
category: (leave empty)
search: phone
page: 1
limit: 10
```

### **Test 2: Search for laptops**
```
category: (leave empty)
search: laptop
page: 1
limit: 5
```

### **Test 3: Pagination test**
```
category: (leave empty)
search: (leave empty)
page: 1
limit: 3
```

### **Test 4: Combined search and pagination**
```
category: (leave empty)
search: iPhone
page: 1
limit: 2
```

### **Test 5: Filter by category (Advanced)**
```
category: PASTE_ELECTRONICS_CATEGORY_ID_HERE
search: (leave empty)
page: 1
limit: 10
```

## 🔧 **How to Get Category ID for Filtering:**

1. **First, get categories:**
   ```
   GET /api/v1/categories
   ```

2. **Copy the `_id` field from response:**
   ```json
   {
     "success": true,
     "data": [
       {
         "_id": "677f1a2b3c4d5e6f7g8h9i0j",  ← COPY THIS
         "name": "Electronics",
         "description": "Electronic devices and gadgets"
       }
     ]
   }
   ```

3. **Use the `_id` in product filter:**
   ```
   category: 677f1a2b3c4d5e6f7g8h9i0j
   search: (leave empty)
   page: 1
   limit: 10
   ```

## 🎯 **Quick Test Scenarios:**

### **Scenario 1: Find all products**
```
category: (empty)
search: (empty)
page: 1
limit: 10
```

### **Scenario 2: Find phones**
```
category: (empty)
search: phone
page: 1
limit: 10
```

### **Scenario 3: Find Samsung products**
```
category: (empty)
search: Samsung
page: 1
limit: 10
```

### **Scenario 4: Find books**
```
category: (empty)
search: book
page: 1
limit: 10
```

### **Scenario 5: Pagination test**
```
category: (empty)
search: (empty)
page: 1
limit: 2
```

## ⚠️ **Common Mistakes to Avoid:**

1. **Don't use category names** - Use ObjectIds
2. **Don't search for "iPhone" and filter by "Samsung"** - They won't match
3. **Don't use page=0** - Use page=1 for first page
4. **Don't use limit=0** - Use positive numbers

## 🚀 **Best Practices:**

- Start with basic searches (no category filter)
- Use realistic search terms from your seeded data
- Test pagination with small limits first
- Only use category filter when you have real ObjectIds

## 🛠️ **POST /api/v1/products - Create Product Examples**

### **Example 1: Create a New Phone**
```json
{
  "name": "Google Pixel 8 Pro",
  "description": "Google's flagship smartphone with AI photography",
  "category": "PASTE_ELECTRONICS_CATEGORY_ID_HERE",
  "basePrice": 799.99,
  "discount": 0,
  "brand": "Google",
  "variants": [
    {
      "name": "128GB Obsidian",
      "price": 799.99,
      "inventory": 30,
      "sku": "GPX8-128-OB"
    },
    {
      "name": "256GB Snow",
      "price": 899.99,
      "inventory": 20,
      "sku": "GPX8-256-SW"
    }
  ],
  "isActive": true
}
```

### **Example 2: Create a Laptop**
```json
{
  "name": "Dell XPS 13",
  "description": "Ultra-thin laptop for professionals",
  "category": "PASTE_ELECTRONICS_CATEGORY_ID_HERE",
  "basePrice": 1299.99,
  "discount": 10,
  "brand": "Dell",
  "variants": [
    {
      "name": "Intel i7 - 512GB",
      "price": 1299.99,
      "inventory": 15,
      "sku": "DXP13-I7-512"
    },
    {
      "name": "Intel i7 - 1TB",
      "price": 1499.99,
      "inventory": 8,
      "sku": "DXP13-I7-1TB"
    }
  ],
  "isActive": true
}
```

### **Example 3: Create Clothing**
```json
{
  "name": "Adidas Ultraboost 22",
  "description": "Premium running shoes with boost technology",
  "category": "PASTE_CLOTHING_CATEGORY_ID_HERE",
  "basePrice": 180.00,
  "discount": 15,
  "brand": "Adidas",
  "variants": [
    {
      "name": "Size 9 - Black",
      "price": 180.00,
      "inventory": 25,
      "sku": "AUB22-9-BLK"
    },
    {
      "name": "Size 10 - White",
      "price": 180.00,
      "inventory": 30,
      "sku": "AUB22-10-WHT"
    }
  ],
  "isActive": true
}
```

### **Example 4: Create a Book**
```json
{
  "name": "Clean Code",
  "description": "A handbook of agile software craftsmanship",
  "category": "PASTE_BOOKS_CATEGORY_ID_HERE",
  "basePrice": 45.99,
  "discount": 0,
  "brand": "Prentice Hall",
  "variants": [
    {
      "name": "Paperback",
      "price": 45.99,
      "inventory": 50,
      "sku": "CC-PB-2024"
    },
    {
      "name": "Hardcover",
      "price": 65.99,
      "inventory": 20,
      "sku": "CC-HC-2024"
    }
  ],
  "isActive": true
}
```

## ⚠️ **Important Notes for POST:**

1. **Unique SKUs Required:** Each variant must have a unique SKU across all products
2. **Valid Category ID:** Must be an ObjectId from `/api/v1/categories`
3. **Price Validation:** basePrice and variant prices must be positive numbers
4. **Inventory:** Must be non-negative integers

## 🚀 **Ready-to-Use POST Request (Copy & Paste):**

**Use this exact JSON** (just get the category ID first):

```json
{
  "name": "OnePlus 12",
  "description": "Flagship smartphone with fast charging",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 699.99,
  "discount": 5,
  "brand": "OnePlus",
  "variants": [
    {
      "name": "128GB Flowy Emerald",
      "price": 699.99,
      "inventory": 35,
      "sku": "OP12-128-EM"
    },
    {
      "name": "256GB Silky Black",
      "price": 799.99,
      "inventory": 25,
      "sku": "OP12-256-BK"
    }
  ],
  "isActive": true
}
```

**Steps:**
1. Get Electronics category ID from `/api/v1/categories`
2. Replace `REPLACE_WITH_ELECTRONICS_CATEGORY_ID` with the actual ID
3. Execute the request

## 🔧 **SKU Naming Convention:**
- **Format:** `BRAND_ABBREV + MODEL + VARIANT + COLOR`
- **Examples:** 
  - `IP15-128-BK` (iPhone 15, 128GB, Black)
  - `SGS25U-256-SL` (Samsung Galaxy S25 Ultra, 256GB, Silver)
  - `MBP14-M3-512` (MacBook Pro 14", M3 chip, 512GB)

This ensures each product variant has a unique identifier!

## ⚠️ **JSON Formatting Rules:**

### **Common JSON Mistakes:**
1. **Missing commas** between properties
2. **Extra commas** after last property
3. **Mixing multiple objects** in one request
4. **Unclosed braces** or brackets
5. **Duplicate properties**

### **Correct JSON Structure:**
```json
{
  "property1": "value1",
  "property2": "value2",
  "arrayProperty": [
    {
      "subProperty": "value"
    }
  ],
  "lastProperty": "value"
}
```

## 🚀 **Fixed JSON for Your Request:**

**Use this EXACT JSON** (copy and paste, don't modify):

```json
{
  "name": "Samsung Galaxy S25 Ultra",
  "description": "Next generation Samsung smartphone with AI features",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 899.99,
  "discount": 5,
  "brand": "Samsung",
  "variants": [
    {
      "name": "128GB Phantom Black",
      "price": 899.99,
      "inventory": 40,
      "sku": "SGS25U-128-BK"
    },
    {
      "name": "256GB Phantom Silver",
      "price": 999.99,
      "inventory": 25,
      "sku": "SGS25U-256-SL"
    }
  ],
  "isActive": true
}
```

## 🎯 **Alternative Products to Test:**

### **Option 1: Create a Tablet**
```json
{
  "name": "iPad Air 2024",
  "description": "Apple's versatile tablet with M2 chip",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 599.99,
  "discount": 0,
  "brand": "Apple",
  "variants": [
    {
      "name": "64GB WiFi - Space Gray",
      "price": 599.99,
      "inventory": 30,
      "sku": "IPAD24-64-SG"
    },
    {
      "name": "256GB WiFi - Silver",
      "price": 749.99,
      "inventory": 20,
      "sku": "IPAD24-256-SV"
    }
  ],
  "isActive": true
}
```

### **Option 2: Create Headphones**
```json
{
  "name": "Sony WH-1000XM5",
  "description": "Premium noise-canceling wireless headphones",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 399.99,
  "discount": 10,
  "brand": "Sony",
  "variants": [
    {
      "name": "Black",
      "price": 399.99,
      "inventory": 45,
      "sku": "SONY-WH5-BK"
    },
    {
      "name": "Silver",
      "price": 399.99,
      "inventory": 35,
      "sku": "SONY-WH5-SV"
    }
  ],
  "isActive": true
}
```

## 🎯 **Working Example - Create a Different Product:**

Since "Samsung Galaxy S25 Ultra" already exists, try creating a completely different product:

```json
{
  "name": "Xiaomi 14 Pro",
  "description": "Flagship smartphone with Leica camera partnership",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 749.99,
  "discount": 8,
  "brand": "Xiaomi",
  "variants": [
    {
      "name": "256GB Titanium Gray",
      "price": 749.99,
      "inventory": 50,
      "sku": "XM14P-256-TG"
    },
    {
      "name": "512GB Titanium Blue",
      "price": 849.99,
      "inventory": 30,
      "sku": "XM14P-512-TB"
    }
  ],
  "isActive": true
}
```

## 🔄 **Understanding GET vs POST:**

- **GET /api/v1/products** - **Reads** existing products (doesn't change anything)
- **POST /api/v1/products** - **Creates** new products (adds to database)

**GET operations never affect POST operations!** They're independent.

## 🧪 **Test Sequence:**

1. **GET first** - See what already exists
2. **POST different** - Create something new with unique SKUs
3. **GET again** - Verify your new product was created

## 🚀 **Quick Fix - Use This JSON:**

```json
{
  "name": "Nothing Phone 2",
  "description": "Transparent design smartphone with unique glyph interface",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 599.99,
  "discount": 0,
  "brand": "Nothing",
  "variants": [
    {
      "name": "128GB White",
      "price": 599.99,
      "inventory": 40,
      "sku": "NP2-128-WHT"
    },
    {
      "name": "256GB Black",
      "price": 699.99,
      "inventory": 25,
      "sku": "NP2-256-BLK"
    }
  ],
  "isActive": true
}
```

**This should work because:**
- ✅ **Different product name**
- ✅ **Unique SKUs** (NP2-128-WHT, NP2-256-BLK)
- ✅ **Same category ID** (already worked in your GET)

The issue isn't that GET affected POST - it's that you're trying to create duplicate products! 🎯

## 🔄 **PUT /api/v1/products/{id} - Update Product Examples**

### **Important: Use Real Product IDs**
⚠️ **You must use an existing product ID from your database!**

**Step 1: Get existing products first**
```
GET /api/v1/products
```

**Step 2: Copy a real product ID from the response**
```json
{
  "data": [
    {
      "_id": "6877fa95919638a8b1ce0275",  ← COPY THIS ID
      "name": "Samsung Galaxy S25 Ultra - Space Brand-Xxpert"
    }
  ]
}
```

**Step 3: Use that ID in your PUT request**

### **Example 1: Update Product Details**
**Product ID:** `6877fa95919638a8b1ce0275`
**Request Body:**
```json
{
  "name": "Samsung Galaxy S25 Ultra - Space Brand-Xxpert UPDATED",
  "description": "Updated limited edition Samsung smartphone with premium features and enhanced AI capabilities",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 1099.99,
  "discount": 10,
  "brand": "Samsung",
  "variants": [
    {
      "name": "128GB Khot2020 Keys Updated",
      "price": 1099.99,
      "inventory": 35,
      "sku": "SGS25U-641-GD"
    },
    {
      "name": "256GB Khot Keys Updated",
      "price": 1199.99,
      "inventory": 20,
      "sku": "SGS25U-254-PP"
    }
  ],
  "isActive": true
}
```

### **Example 2: Update Price and Inventory**
**Product ID:** `6877fa95919638a8b1ce0275`
**Request Body:**
```json
{
  "name": "Samsung Galaxy S25 Ultra - Space Brand-Xxpert",
  "description": "Limited edition Samsung smartphone with premium features",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 949.99,
  "discount": 15,
  "brand": "Samsung",
  "variants": [
    {
      "name": "128GB Khot2020 Keys",
      "price": 949.99,
      "inventory": 50,
      "sku": "SGS25U-641-GD"
    },
    {
      "name": "256GB Khot Keys",
      "price": 1049.99,
      "inventory": 30,
      "sku": "SGS25U-254-PP"
    }
  ],
  "isActive": true
}
```

## 🔄 **PUT Request Types - Complete Guide**

### **There are 2 types of PUT requests:**

#### **1. PUT /api/v1/products/{id} - Update Full Product**
**Purpose:** Update entire product (name, price, description, etc.)
**Requirements:**
- **Path Parameter:** Product ID (e.g., `6878018a268ceeb0c49ae201`)
- **Request Body:** Complete product object

#### **2. PUT /api/v1/products/{id}/inventory - Update Inventory Only**
**Purpose:** Update inventory for a specific variant
**Requirements:**
- **Path Parameter:** Product ID (e.g., `6878018a268ceeb0c49ae201`)
- **Request Body:** `{ "variantId": "variant_id", "quantity": 50 }`

### **🚨 Important: You deleted the product!**

In your example, you:
1. ✅ **DELETE** - Successfully deleted product `6878018a268ceeb0c49ae201`
2. ❌ **PUT inventory** - Failed because the product no longer exists

### **🔧 Working PUT Examples:**

#### **Step 1: Create a test product first**
**POST /api/v1/products**
```json
{
  "name": "Test Product for PUT",
  "description": "Product created to test PUT requests",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 299.99,
  "discount": 5,
  "brand": "TestBrand",
  "variants": [
    {
      "name": "Standard Version",
      "price": 299.99,
      "inventory": 50,
      "sku": "TEST-PUT-001"
    },
    {
      "name": "Premium Version",
      "price": 399.99,
      "inventory": 30,
      "sku": "TEST-PUT-002"
    }
  ],
  "isActive": true
}
```

#### **Step 2: Note the returned IDs**
After POST, you'll get:
```json
{
  "success": true,
  "data": {
    "_id": "NEW_PRODUCT_ID",        ← Use this for PUT
    "variants": [
      {
        "_id": "VARIANT_1_ID",      ← Use this for inventory update
        "sku": "TEST-PUT-001"
      },
      {
        "_id": "VARIANT_2_ID",      ← Use this for inventory update
        "sku": "TEST-PUT-002"
      }
    ]
  }
}
```

#### **Step 3A: Update Full Product**
**PUT /api/v1/products/NEW_PRODUCT_ID**
```json
{
  "name": "Updated Test Product",
  "description": "Updated description with new features",
  "category": "6877eff17d616a5d185dc209",
  "basePrice": 349.99,
  "discount": 10,
  "brand": "TestBrand",
  "variants": [
    {
      "name": "Standard Version Updated",
      "price": 349.99,
      "inventory": 60,
      "sku": "TEST-PUT-001"
    },
    {
      "name": "Premium Version Updated",
      "price": 449.99,
      "inventory": 40,
      "sku": "TEST-PUT-002"
    }
  ],
  "isActive": true
}
```

#### **Step 3B: Update Inventory Only**
**PUT /api/v1/products/NEW_PRODUCT_ID/inventory**
```json
{
  "variantId": "VARIANT_1_ID",
  "quantity": 75
}
```

### **🎯 Key Differences:**

| Method | Purpose | Path | Request Body |
|--------|---------|------|--------------|
| **Create Product** | Add new product | `/api/v1/products` | Complete product object |
| **Update Full Product** | Change name, price, description, etc. | `/api/v1/products/{id}` | Complete product object |
| **Update Inventory Only** | Change quantity for a variant | `/api/v1/products/{id}/inventory` | `{"variantId": "...", "quantity": 100}` |

### **⚠️ Common PUT Mistakes:**

1. **Using deleted product ID** - Product must exist
2. **Wrong variant ID** - Must be actual variant ID from database
3. **Missing required fields** - Full update needs all product fields
4. **Invalid JSON** - Check syntax and formatting

### **✅ PUT Testing Workflow:**

1. **POST** - Create a test product
2. **GET** - Verify it exists and note IDs
3. **PUT** - Update using the correct ID
4. **GET** - Verify the update worked

## 🗑️ **DELETE /api/v1/products/{id} - Delete Product Examples**

### **Important: Use Real Product IDs**
⚠️ **You must use an existing product ID from your database!**

**Step 1: Get existing products first**
```
GET /api/v1/products
```

**Step 2: Copy a real product ID from the response**
```json
{
  "data": [
    {
      "_id": "6877fa95919638a8b1ce0275",  ← COPY THIS ID
      "name": "Samsung Galaxy S25 Ultra - Space Brand-Xxpert"
    }
  ]
}
```

**Step 3: Use that ID in your DELETE request**

### **Example 1: Delete a Product**
**Product ID:** `6877fa95919638a8b1ce0275`
**Request:** 
```
DELETE /api/v1/products/6877fa95919638a8b1ce0275
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

### **Example 2: Try to Delete Non-Existent Product**
**Product ID:** `000000000000000000000000`
**Request:** 
```
DELETE /api/v1/products/000000000000000000000000
```

**Expected Response (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

### **⚠️ Common DELETE Errors:**

1. **404 Product not found** - Using invalid/non-existent product ID
2. **400 Invalid ObjectId** - Using malformed product ID
3. **500 Internal Server Error** - Server-side issues (now fixed!)

### **✅ DELETE Best Practices:**

- **Always verify the product exists** before deleting
- **Use GET first** to confirm the product ID is valid
- **Be careful with DELETE** - it permanently removes the product
- **Consider soft deletes** for production (mark as inactive instead)

### **🧪 Testing DELETE Requests:**

1. **GET all products** to see what exists
2. **Copy a real product ID**
3. **DELETE the product**
4. **GET all products again** to verify it's gone
5. **Try to GET by ID** to confirm 404 response

### **🔄 Safe DELETE Testing Workflow:**

1. **Create a test product first** (using POST)
2. **Note the returned product ID**
3. **Delete that test product** (using DELETE)
4. **Verify it's gone** (using GET)

This way you don't accidentally delete important data!

## 📚 **GET /api/v1/categories - Category Management**

### **Basic Categories Tests:**
```
GET /api/v1/categories
```

### **Category Query Parameters:**
- **page** - Page number (default: 1)
- **limit** - Items per page (default: 10)
- **sort** - Sort field (default: name)
- **order** - Sort order: asc/desc (default: asc)
- **search** - Search in name or description

### **Category Test Examples:**

#### **Test 1: Get all categories**
```
page: 1
limit: 10
sort: name
order: asc
search: (empty)
```

#### **Test 2: Search for electronics**
```
page: 1
limit: 10
sort: name
order: asc
search: electronics
```

#### **Test 3: Search for clothing**
```
page: 1
limit: 10
sort: name
order: asc
search: clothing
```

#### **Test 4: Search for books**
```
page: 1
limit: 10
sort: name
order: asc
search: books
```

#### **Test 5: Sort by name descending**
```
page: 1
limit: 10
sort: name
order: desc
search: (leave empty)
```

#### **Test 6: Pagination test**
```
page: 1
limit: 5
sort: name
order: asc
search: (leave empty)
```

#### **Test 7: Search with pagination**
```
page: 1
limit: 3
sort: name
order: asc
search: device
```

### **🔧 Parameter Details:**

| Parameter | Type | Purpose | Example Values |
|-----------|------|---------|----------------|
| **page** | integer | Page number (starts at 1) | `1`, `2`, `3` |
| **limit** | integer | Items per page | `5`, `10`, `20` |
| **sort** | string | Field to sort by | `name`, `createdAt` |
| **order** | string | Sort direction | `asc`, `desc` |
| **search** | string | Search in name/description | `electronics`, `clothing`, `books` |

### **🎯 Quick Test Sequence:**

1. **Start with Test 1** (basic - all categories)
2. **Try Test 2** (search for electronics)
3. **Try Test 5** (sort descending)
4. **Try Test 6** (pagination)

### **💡 Expected Results:**

- **All categories:** Should return your seeded categories
- **Electronics search:** Should find "Electronics" category
- **Clothing search:** Should find "Clothing" category  
- **Books search:** Should find "Books" category
- **Desc order:** Categories in reverse alphabetical order
- **Pagination:** Limited number of results per page

### **🔍 What to Look For:**

- **success**: Should be `true`
- **count**: Number of categories returned
- **pagination**: Page info with total count
- **data**: Array of category objects with `_id`, `name`, `description`

## 🎯 **LIVE TESTING: Categories - Input Values**

### **📋 Copy-Paste Values for Category Testing:**

#### **Test 1: Get all categories (basic)**
```
page: 1
limit: 10
sort: name
order: asc
search: (leave empty)
```

#### **Test 2: Search for electronics**
```
page: 1
limit: 10
sort: name
order: asc
search: electronics
```

#### **Test 3: Search for clothing**
```
page: 1
limit: 10
sort: name
order: asc
search: clothing
```

#### **Test 4: Search for books**
```
page: 1
limit: 10
sort: name
order: asc
search: books
```

#### **Test 5: Sort by name descending**
```
page: 1
limit: 10
sort: name
order: desc
search: (leave empty)
```

#### **Test 6: Pagination test**
```
page: 1
limit: 5
sort: name
order: asc
search: (leave empty)
```

#### **Test 7: Search with pagination**
```
page: 1
limit: 3
sort: name
order: asc
search: device
```

### **🔧 Parameter Details:**

| Parameter | Type | Purpose | Example Values |
|-----------|------|---------|----------------|
| **page** | integer | Page number (starts at 1) | `1`, `2`, `3` |
| **limit** | integer | Items per page | `5`, `10`, `20` |
| **sort** | string | Field to sort by | `name`, `createdAt` |
| **order** | string | Sort direction | `asc`, `desc` |
| **search** | string | Search in name/description | `electronics`, `clothing`, `books` |

### **🎯 Quick Test Sequence:**

1. **Start with Test 1** (basic - all categories)
2. **Try Test 2** (search for electronics)
3. **Try Test 5** (sort descending)
4. **Try Test 6** (pagination)

### **💡 Expected Results:**

- **All categories:** Should return your seeded categories
- **Electronics search:** Should find "Electronics" category
- **Clothing search:** Should find "Clothing" category  
- **Books search:** Should find "Books" category
- **Desc order:** Categories in reverse alphabetical order
- **Pagination:** Limited number of results per page

### **🔍 What to Look For:**

- **success**: Should be `true`
- **count**: Number of categories returned
- **pagination**: Page info with total count
- **data**: Array of category objects with `_id`, `name`, `description`
