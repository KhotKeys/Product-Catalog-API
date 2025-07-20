const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Catalog API',
      version: '1.0.0',
      description: 'RESTful API for Product Catalog System',
      contact: {
        name: 'API Support',
        email: 'support@productcatalog.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Products',
        description: 'Product management operations'
      },
      {
        name: 'Categories', 
        description: 'Category management operations'
      },
      {
        name: 'Reports',
        description: 'Reporting and analytics operations'
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/controllers/*.js',
    './server.js'
  ]
};

const specs = swaggerJsdoc(options);
module.exports = specs; 