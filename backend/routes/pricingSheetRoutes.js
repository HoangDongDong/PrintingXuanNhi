const express = require('express');
const router = express.Router();
const pricingSheetController = require('../controllers/pricingSheetController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', pricingSheetController.getAllPricingSheets);
router.post('/', verifyToken, isAdmin, pricingSheetController.createPricingSheet);
router.put('/:id', verifyToken, isAdmin, pricingSheetController.updatePricingSheet);
router.delete('/:id', verifyToken, isAdmin, pricingSheetController.deletePricingSheet);

module.exports = router;
