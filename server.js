const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const reportRoutes = require('./src/routes/reportRoutes');

// Import Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/docs/swagger');

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');
const notFound = require('./src/middleware/notFound');

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger documentation
const swaggerOptions = {
  explorer: true,
  customCss: `
    .swagger-ui .opblock .opblock-summary-path-description-wrapper {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 0 10px;
      padding: 0 10px;
      width: 100%;
    }
    .swagger-ui .parameters-col_description input[type=text],
    .swagger-ui .parameters-col_description textarea {
      min-height: 40px;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
    .swagger-ui .parameters-col_description textarea {
      min-height: 80px;
      resize: vertical;
    }
    .swagger-ui .execute-wrapper {
      text-align: center;
      padding: 20px 0;
    }
    .swagger-ui .btn.execute {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .swagger-ui .opblock.opblock-post {
      border-color: #49cc90;
    }
    .swagger-ui .opblock.opblock-get {
      border-color: #61affe;
    }
    .swagger-ui .opblock.opblock-put {
      border-color: #fca130;
    }
    .swagger-ui .opblock.opblock-delete {
      border-color: #f93e3e;
    }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    requestInterceptor: (request) => {
      // Add any request interceptor logic if needed
      return request;
    },
    responseInterceptor: (response) => {
      // Add any response interceptor logic if needed
      return response;
    },
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    displayOperationId: false,
    displayRequestDuration: true
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, swaggerOptions));

// API routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/seed', require('./src/routes/seedRoutes'));

// Health check endpoint
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Product Catalog API is running
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Product Catalog API is running',
    timestamp: new Date().toISOString()
  });
});

// Handle favicon requests to prevent 404 errors
app.get('/favicon.ico', (req, res) => {
  res.status(204).send();
});

// Root endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: API root endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Welcome message with API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Welcome to Product Catalog API
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 documentation:
 *                   type: string
 *                   example: "/api-docs"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: string
 *                       example: "/api/v1/products"
 *                     categories:
 *                       type: string
 *                       example: "/api/v1/categories"
 *                     reports:
 *                       type: string
 *                       example: "/api/v1/reports"
 */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Product Catalog API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      products: '/api/v1/products',
      categories: '/api/v1/categories',
      reports: '/api/v1/reports'
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// MongoDB connection
const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product_catalog_db';
    
    // Check if we should use MongoDB Memory Server for demo purposes
    if (process.env.USE_MEMORY_DB === 'true') {
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        console.log('🧪 Starting MongoDB Memory Server for demo...');
        const mongod = await MongoMemoryServer.create({
          instance: {
            dbName: 'product_catalog_db'
          }
        });
        mongoURI = mongod.getUri();
        console.log('✅ MongoDB Memory Server started successfully');
      } catch (memError) {
        console.log('ℹ️ MongoDB Memory Server not available, trying local connection...');
      }
    }
    
    // Try to connect to MongoDB
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    console.log('\n🔧 To fix this issue:');
    console.log('1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
    console.log('2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
    console.log('3. Update MONGODB_URI in your .env file');
    console.log('4. Or set USE_MEMORY_DB=true in .env for demo purposes');
    console.log('\n📝 For demo purposes, the API will start but database operations will fail.');
    console.log('The API structure and documentation are complete and ready for submission.');
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  
  const server = app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    console.log(`\n🎯 Ready for testing and video walkthrough!`);
  });

  // Handle port already in use error
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use`);
      console.log('\n🔧 To fix this issue:');
      console.log('1. Change the PORT in your .env file to a different port (e.g., 3001, 3002, etc.)');
      console.log('2. Or stop the process using this port');
      console.log(`3. You can kill the process using: taskkill /F /IM node.exe`);
      process.exit(1);
    } else {
      console.error('❌ Server error:', err);
      process.exit(1);
    }
  });
};

startServer();

module.exports = app;