const Product = require('../models/product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { title, description, price, imageUrl, isFeatured } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Product title is required' });
    }

    const product = await Product.create({
      title,
      description,
      price: price || 0.00,
      imageUrl: imageUrl || '',
      isFeatured: isFeatured || false
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
