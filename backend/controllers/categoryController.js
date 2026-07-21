const { Category } = require('../models');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['id', 'ASC']]
    });
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
