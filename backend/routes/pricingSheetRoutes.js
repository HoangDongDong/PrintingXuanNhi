const express = require('express');
const router = express.Router();
const pricingSheetController = require('../controllers/pricingSheetController');

router.get('/', pricingSheetController.getAllPricingSheets);
router.post('/', pricingSheetController.createPricingSheet);
router.put('/:id', pricingSheetController.updatePricingSheet);
router.delete('/:id', pricingSheetController.deletePricingSheet);

module.exports = router;
