const mongoose = require('mongoose');

// Variant Schema for product variants (size, color, etc.)
const VariantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Variant name is required'],
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    trim: true
  },
  sku: {
    type: String,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Variant price is required'],
    min: [0, 'Price cannot be negative']
  },
  inventory: {
    type: Number,
    default: 0,
    min: [0, 'Inventory cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, 'Brand name cannot be more than 50 characters']
  },
  basePrice: {
    type: Number,
    required: [true, 'Base price is required'],
    min: [0, 'Price cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage'
  },
  variants: [VariantSchema],
  images: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for final price calculation
ProductSchema.virtual('finalPrice').get(function() {
  if (this.discountType === 'percentage') {
    return this.basePrice * (1 - this.discount / 100);
  } else {
    return Math.max(0, this.basePrice - this.discount);
  }
});

// Virtual for total inventory
ProductSchema.virtual('totalInventory').get(function() {
  if (this.variants && this.variants.length > 0) {
    return this.variants.reduce((total, variant) => total + variant.inventory, 0);
  }
  return 0;
});

// Virtual for in stock status
ProductSchema.virtual('inStock').get(function() {
  return this.totalInventory > 0;
});

// Pre-save middleware to create slug
ProductSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  next();
});

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ 'variants.sku': 1 });

module.exports = mongoose.model('Product', ProductSchema); 