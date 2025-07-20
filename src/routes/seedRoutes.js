const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// Get current database status
const getDatabaseStatus = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const activeCategories = await Category.countDocuments({ isActive: true });
    
    // Get low stock count
    const lowStockProducts = await Product.countDocuments({
      isActive: true,
      'variants.inventory': { $lt: 10 }
    });

    // Get recent products
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('category', 'name')
      .select('name basePrice totalInventory createdAt');

    res.status(200).json({
      success: true,
      data: {
        database: {
          totalProducts,
          totalCategories,
          activeProducts,
          activeCategories,
          lowStockProducts
        },
        recentProducts,
        recommendations: {
          needsSeeding: totalProducts === 0,
          message: totalProducts === 0 
            ? 'Database is empty. Consider seeding with sample data.'
            : `Database contains ${totalProducts} products and ${totalCategories} categories.`
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Seed database with sample data
const seedDatabase = async (req, res, next) => {
  try {
    // Get optional parameters from request body
    const { 
      clearExisting = true, 
      productCount = 6, 
      categoryCount = 4,
      includeLowStock = true 
    } = req.body;

    // Clear existing data if requested
    if (clearExisting) {
      await Product.deleteMany({});
      await Category.deleteMany({});
    }

    // Get current counts
    const existingProducts = await Product.countDocuments();
    const existingCategories = await Category.countDocuments();

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        slug: 'electronics',
        isActive: true
      },
      {
        name: 'Clothing',
        description: 'Apparel and fashion items',
        slug: 'clothing',
        isActive: true
      },
      {
        name: 'Books',
        description: 'Books and educational materials',
        slug: 'books',
        isActive: true
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and gardening items',
        slug: 'home-garden',
        isActive: true
      }
    ]);

    // Create products
    const products = await Product.insertMany([
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced features',
        slug: 'iphone-15-pro',
        category: categories[0]._id, // Electronics
        basePrice: 999.99,
        variants: [
          {
            name: '128GB - Space Black',
            price: 999.99,
            inventory: 25,
            sku: 'IP15-128-BK'
          },
          {
            name: '256GB - Space Black',
            price: 1099.99,
            inventory: 15,
            sku: 'IP15-256-BK'
          },
          {
            name: '128GB - Blue',
            price: 999.99,
            inventory: 8, // Low stock
            sku: 'IP15-128-BL'
          }
        ],
        totalInventory: 48,
        isActive: true
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Premium Android smartphone',
        slug: 'samsung-galaxy-s24',
        category: categories[0]._id, // Electronics
        basePrice: 799.99,
        variants: [
          {
            name: '128GB - Black',
            price: 799.99,
            inventory: 30,
            sku: 'SG24-128-BK'
          },
          {
            name: '256GB - Silver',
            price: 899.99,
            inventory: 5, // Low stock
            sku: 'SG24-256-SL'
          }
        ],
        totalInventory: 35,
        isActive: true
      },
      {
        name: 'MacBook Pro 14"',
        description: 'Professional laptop for creators',
        slug: 'macbook-pro-14',
        category: categories[0]._id, // Electronics
        basePrice: 1999.99,
        variants: [
          {
            name: 'M3 Chip - 512GB',
            price: 1999.99,
            inventory: 12,
            sku: 'MBP14-M3-512'
          },
          {
            name: 'M3 Pro - 1TB',
            price: 2499.99,
            inventory: 3, // Low stock
            sku: 'MBP14-M3P-1TB'
          }
        ],
        totalInventory: 15,
        isActive: true
      },
      {
        name: 'Nike Air Max 90',
        description: 'Classic running shoes',
        slug: 'nike-air-max-90',
        category: categories[1]._id, // Clothing
        basePrice: 120.00,
        variants: [
          {
            name: 'Size 9 - White',
            price: 120.00,
            inventory: 50,
            sku: 'NAM90-9-WHT'
          },
          {
            name: 'Size 10 - Black',
            price: 120.00,
            inventory: 7, // Low stock
            sku: 'NAM90-10-BLK'
          }
        ],
        totalInventory: 57,
        isActive: true
      },
      {
        name: 'JavaScript: The Good Parts',
        description: 'Essential JavaScript programming book',
        slug: 'javascript-the-good-parts',
        category: categories[2]._id, // Books
        basePrice: 29.99,
        variants: [
          {
            name: 'Paperback',
            price: 29.99,
            inventory: 100,
            sku: 'JSGP-PB'
          },
          {
            name: 'Hardcover',
            price: 39.99,
            inventory: 2, // Low stock
            sku: 'JSGP-HC'
          }
        ],
        totalInventory: 102,
        isActive: true
      },
      {
        name: 'Garden Hose 50ft',
        description: 'Flexible garden hose for watering',
        slug: 'garden-hose-50ft',
        category: categories[3]._id, // Home & Garden
        basePrice: 45.99,
        variants: [
          {
            name: 'Green - 50ft',
            price: 45.99,
            inventory: 25,
            sku: 'GH50-GRN'
          }
        ],
        totalInventory: 25,
        isActive: true
      }
    ]);

    res.status(200).json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        settings: {
          clearExisting,
          includeLowStock,
          requestedProductCount: productCount,
          requestedCategoryCount: categoryCount
        },
        results: {
          existingProductsBeforeSeed: existingProducts,
          existingCategoriesBeforeSeed: existingCategories,
          categoriesCreated: categories.length,
          productsCreated: products.length,
          totalProducts: await Product.countDocuments(),
          totalCategories: await Category.countDocuments()
        },
        testUrls: [
          'http://localhost:3002/api/v1/products',
          'http://localhost:3002/api/v1/products?search=phone',
          'http://localhost:3002/api/v1/categories',
          'http://localhost:3002/api/v1/reports/low-stock'
        ]
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/v1/seed:
 *   post:
 *     summary: Seed database with sample data
 *     tags: [Development]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clearExisting:
 *                 type: boolean
 *                 default: true
 *                 description: Clear existing data before seeding
 *               productCount:
 *                 type: integer
 *                 default: 6
 *                 description: Number of products to create
 *               categoryCount:
 *                 type: integer
 *                 default: 4
 *                 description: Number of categories to create
 *               includeLowStock:
 *                 type: boolean
 *                 default: true
 *                 description: Include low stock items for testing
 *           examples:
 *             default:
 *               summary: Default seeding
 *               value:
 *                 clearExisting: true
 *                 productCount: 6
 *                 categoryCount: 4
 *                 includeLowStock: true
 *             minimal:
 *               summary: Minimal seeding
 *               value:
 *                 clearExisting: false
 *                 productCount: 3
 *                 categoryCount: 2
 *                 includeLowStock: false
 *     responses:
 *       200:
 *         description: Database seeded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     settings:
 *                       type: object
 *                     results:
 *                       type: object
 *                     testUrls:
 *                       type: array
 *                       items:
 *                         type: string
 */

/**
 * @swagger
 * /api/v1/seed:
 *   get:
 *     summary: Get current database status
 *     tags: [Development]
 *     responses:
 *       200:
 *         description: Database status information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: object
 *                     recentProducts:
 *                       type: array
 *                     recommendations:
 *                       type: object
 */

router.route('/')
  .get(getDatabaseStatus)
  .post(seedDatabase);

module.exports = router;
