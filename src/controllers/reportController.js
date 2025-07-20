const Product = require('../models/Product');
const Category = require('../models/Category');

// Get low stock report
const getLowStockReport = async (req, res, next) => {
  try {
    const { threshold = 10 } = req.query;

    const lowStockProducts = await Product.find({
      isActive: true,
      $or: [
        { 'variants.inventory': { $lt: parseInt(threshold) } },
        { totalInventory: { $lt: parseInt(threshold) } }
      ]
    }).populate('category', 'name');

    const lowStockVariants = [];
    lowStockProducts.forEach(product => {
      product.variants.forEach(variant => {
        if (variant.inventory < parseInt(threshold)) {
          lowStockVariants.push({
            productId: product._id,
            productName: product.name,
            category: product.category,
            variant: variant,
            currentStock: variant.inventory
          });
        }
      });
    });

    res.status(200).json({
      success: true,
      data: {
        threshold: parseInt(threshold),
        totalLowStockProducts: lowStockProducts.length,
        totalLowStockVariants: lowStockVariants.length,
        products: lowStockProducts,
        variants: lowStockVariants
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get inventory summary
const getInventorySummary = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const outOfStockProducts = await Product.countDocuments({
      isActive: true,
      'variants.inventory': { $lte: 0 }
    });
    const lowStockProducts = await Product.countDocuments({
      isActive: true,
      'variants.inventory': { $lte: 10, $gt: 0 }
    });

    const categoryStats = await Category.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      },
      {
        $project: {
          name: 1,
          productCount: { $size: '$products' },
          totalInventory: {
            $sum: '$products.variants.inventory'
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        outOfStockProducts,
        lowStockProducts,
        inStockProducts: totalProducts - outOfStockProducts,
        categoryStats
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get price range report
const getPriceRangeReport = async (req, res, next) => {
  try {
    const priceRanges = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$basePrice' },
          maxPrice: { $max: '$basePrice' },
          avgPrice: { $avg: '$basePrice' },
          totalProducts: { $sum: 1 }
        }
      }
    ]);

    const categoryPriceStats = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $group: {
          _id: '$category.name',
          avgPrice: { $avg: '$basePrice' },
          minPrice: { $min: '$basePrice' },
          maxPrice: { $max: '$basePrice' },
          productCount: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overall: priceRanges[0] || {},
        byCategory: categoryPriceStats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLowStockReport,
  getInventorySummary,
  getPriceRangeReport
}; 