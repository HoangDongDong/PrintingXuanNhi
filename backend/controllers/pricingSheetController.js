const db = require('../models');
const PricingSheet = db.PricingSheet;

// Get all pricing sheets
exports.getAllPricingSheets = async (req, res, next) => {
  try {
    const sheets = await PricingSheet.findAll({
      order: [['createdAt', 'ASC']]
    });
    return res.status(200).json(sheets);
  } catch (error) {
    next(error);
  }
};

// Create a new pricing sheet
exports.createPricingSheet = async (req, res, next) => {
  try {
    const { title, description, imageUrl, category } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ message: 'Title and image URL are required' });
    }

    const sheet = await PricingSheet.create({
      title,
      description,
      imageUrl,
      category: category || 'general'
    });

    return res.status(201).json({
      message: 'Pricing sheet created successfully',
      sheet
    });
  } catch (error) {
    next(error);
  }
};

// Update a pricing sheet
exports.updatePricingSheet = async (req, res, next) => {
  try {
    const sheet = await PricingSheet.findByPk(req.params.id);
    if (!sheet) {
      return res.status(404).json({ message: 'Pricing sheet not found' });
    }

    const { title, description, imageUrl, category } = req.body;
    await sheet.update({
      title: title !== undefined ? title : sheet.title,
      description: description !== undefined ? description : sheet.description,
      imageUrl: imageUrl !== undefined ? imageUrl : sheet.imageUrl,
      category: category !== undefined ? category : sheet.category
    });

    return res.status(200).json({
      message: 'Pricing sheet updated successfully',
      sheet
    });
  } catch (error) {
    next(error);
  }
};

// Delete a pricing sheet
exports.deletePricingSheet = async (req, res, next) => {
  try {
    const sheet = await PricingSheet.findByPk(req.params.id);
    if (!sheet) {
      return res.status(404).json({ message: 'Pricing sheet not found' });
    }
    await sheet.destroy();
    return res.status(200).json({ message: 'Pricing sheet deleted successfully' });
  } catch (error) {
    next(error);
  }
};
