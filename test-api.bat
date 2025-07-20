@echo off
echo ================================
echo Product Catalog API Test Script
echo ================================
echo.

echo 1. Testing Health Check...
curl -s http://localhost:3002/health
echo.
echo.

echo 2. Testing Root Endpoint...
curl -s http://localhost:3002/
echo.
echo.

echo 3. Testing Products Endpoint...
curl -s http://localhost:3002/api/v1/products
echo.
echo.

echo 4. Testing Categories Endpoint...
curl -s http://localhost:3002/api/v1/categories
echo.
echo.

echo ================================
echo Tests Complete!
echo ================================
echo Open http://localhost:3002/api-docs in your browser for full documentation
pause
