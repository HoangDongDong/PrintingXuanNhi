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

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { title, description, price, imageUrl, isFeatured } = req.body;
    await product.update({
      title: title !== undefined ? title : product.title,
      description: description !== undefined ? description : product.description,
      price: price !== undefined ? parseFloat(price) : product.price,
      imageUrl: imageUrl !== undefined ? imageUrl : product.imageUrl,
      isFeatured: isFeatured !== undefined ? isFeatured : product.isFeatured
    });

    return res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
