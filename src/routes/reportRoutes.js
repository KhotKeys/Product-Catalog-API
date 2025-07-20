const express = require('express');
const router = express.Router();

const {
  getLowStockReport,
  getInventorySummary,
  getPriceRangeReport
} = require('../controllers/reportController');

/**
 * @swagger
 * /api/v1/reports/low-stock:
 *   get:
 *     summary: Get low stock report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Stock threshold for low stock alert
 *     responses:
 *       200:
 *         description: Low stock report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /api/v1/reports/inventory-summary:
 *   get:
 *     summary: Get inventory summary report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Inventory summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 */

/**
 * @swagger
 * /api/v1/reports/price-range:
 *   get:
 *     summary: Get price range analytics
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Price range report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 */

// Routes
router.route('/low-stock')
  .get(getLowStockReport);

router.route('/inventory-summary')
  .get(getInventorySummary);

router.route('/price-range')
  .get(getPriceRangeReport);

module.exports = router; 