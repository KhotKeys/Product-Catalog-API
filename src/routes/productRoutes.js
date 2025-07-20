const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateInventory
} = require('../controllers/productController');

const validate = require('../middleware/validate');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - basePrice
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The product name
 *         description:
 *           type: string
 *           description: The product description
 *         category:
 *           type: string
 *           description: The category ID
 *         basePrice:
 *           type: number
 *           description: The base price of the product
 *         discount:
 *           type: number
 *           description: Discount percentage
 *         brand:
 *           type: string
 *           description: Product brand
 *         variants:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               inventory:
 *                 type: integer
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// Validation rules
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('category')
    .isMongoId()
    .withMessage('Valid category ID is required'),
  body('basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
  body('discount')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount must be between 0 and 100'),
  body('brand')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Brand name cannot exceed 50 characters'),
  body('variants.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Variant name is required'),
  body('variants.*.price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Variant price must be positive'),
  body('variants.*.inventory')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Variant inventory must be non-negative')
];

const inventoryValidation = [
  body('variantId')
    .notEmpty()
    .withMessage('Variant ID is required'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer')
];

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in product name or description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 pagination:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - basePrice
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *               description:
 *                 type: string
 *                 example: "Latest iPhone with advanced camera system and titanium design"
 *               category:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               basePrice:
 *                 type: number
 *                 example: 999.99
 *               discount:
 *                 type: number
 *                 example: 10
 *               brand:
 *                 type: string
 *                 example: "Apple"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, discontinued]
 *                 example: "active"
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "128GB Space Black"
 *                     price:
 *                       type: number
 *                       example: 999.99
 *                     stock:
 *                       type: number
 *                       example: 50
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "60d21b4667d0d8992e610c85"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15 Pro Max Updated"
 *               description:
 *                 type: string
 *                 example: "Updated iPhone 15 Pro Max with enhanced camera system, titanium design, and improved battery life. Features A17 Pro chip and advanced computational photography."
 *               category:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               basePrice:
 *                 type: number
 *                 example: 1199.99
 *               discount:
 *                 type: number
 *                 example: 15
 *               brand:
 *                 type: string
 *                 example: "Apple"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, discontinued]
 *                 example: "active"
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "256GB Deep Purple"
 *                     price:
 *                       type: number
 *                       example: 1299.99
 *                     inventory:
 *                       type: number
 *                       example: 25
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/v1/products/{id}/inventory:
 *   put:
 *     summary: Update product inventory
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               variantId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *       404:
 *         description: Product not found
 */

// Routes
router.route('/')
  .get(getProducts)
  .post(productValidation, validate, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(productValidation, validate, updateProduct)
  .delete(deleteProduct);

router.route('/:id/inventory')
  .put(inventoryValidation, validate, updateInventory);

module.exports = router; 