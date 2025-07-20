const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  try {
    console.log('🧪 Testing Product Catalog API...\n');

    // Test health check
    console.log('1. Testing Health Check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', health.data);

    // Test root endpoint
    console.log('\n2. Testing Root Endpoint...');
    const root = await axios.get(`${BASE_URL}/`);
    console.log('✅ Root Endpoint:', root.data);

    // Test categories
    console.log('\n3. Testing Categories...');
    const categories = await axios.get(`${BASE_URL}/api/v1/categories`);
    console.log('✅ Get Categories:', categories.data);

    // Test products
    console.log('\n4. Testing Products...');
    const products = await axios.get(`${BASE_URL}/api/v1/products`);
    console.log('✅ Get Products:', products.data);

    // Test reports
    console.log('\n5. Testing Reports...');
    const reports = await axios.get(`${BASE_URL}/api/v1/reports/low-stock`);
    console.log('✅ Low Stock Report:', reports.data);

    console.log('\n🎉 All tests passed! API is working correctly.');
    console.log('\n📚 API Documentation: http://localhost:3000/api-docs');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testAPI(); 