const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
require('dotenv').config();

const seedData = async () => {
  let mongoServer;
  
  try {
    // Start MongoDB Memory Server
    console.log('🧪 Starting MongoDB Memory Server...');
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB Memory Server');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        isActive: true
      },
      {
        name: 'Clothing',
        description: 'Apparel and fashion items',
        isActive: true
      },
      {
        name: 'Books',
        description: 'Books and educational materials',
        isActive: true
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and gardening items',
        isActive: true
      }
    ]);

    console.log('Categories created:', categories.length);

    // Create products
    const products = await Product.insertMany([
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced features',
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

    console.log('Products created:', products.length);
    console.log('✅ Database seeded successfully!');

    // Show summary
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    
    console.log(`\n📊 Summary:`);
    console.log(`- Categories: ${totalCategories}`);
    console.log(`- Products: ${totalProducts}`);
    console.log(`\n🚀 Test your API now at:`);
    console.log(`- All products: http://localhost:3002/api/v1/products`);
    console.log(`- Search phone: http://localhost:3002/api/v1/products?search=phone`);
    console.log(`- Low stock report: http://localhost:3002/api/v1/reports/low-stock`);
    console.log(`- Swagger UI: http://localhost:3002/api-docs`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log('🔌 Database connection closed');
  }
};

seedData();
