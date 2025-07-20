const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all products with filtering and search
const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category, minPrice, maxPrice, inStock } = req.query;

    let query = Product.find();

    if (search) {
      query = query.find({ $text: { $search: search } });
    }

    if (category) {
      query = query.find({ category });
    }

    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.$lte = parseFloat(maxPrice);
      query = query.find({ basePrice: priceFilter });
    }

    if (inStock === 'true') {
      query = query.find({ 'variants.inventory': { $gt: 0 } });
    }

    query = query.find({ isActive: true });
    query = query.sort({ createdAt: -1 });
    query = query.skip((parseInt(page) - 1) * parseInt(limit)).limit(parseInt(limit));
    query = query.populate('category', 'name');

    const products = await query.exec();
    const total = await Product.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      count: products.length,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
const getProduct = async (req, res, next) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid product ID format. Must be a 24-character hex string.' 
      });
    }

    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Create new product
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    await product.populate('category');
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Update product
const updateProduct = async (req, res, next) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid product ID format. Must be a 24-character hex string.' 
      });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category');

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid product ID format. Must be a 24-character hex string.' 
      });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// Update inventory
const updateInventory = async (req, res, next) => {
  try {
    const { variantId, quantity } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      return res.status(404).json({ success: false, error: 'Variant not found' });
    }

    variant.inventory = Math.max(0, quantity);
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateInventory
}; 