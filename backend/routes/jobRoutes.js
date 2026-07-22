const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', jobController.getAllJobs);
router.post('/', verifyToken, isAdmin, jobController.createJob);
router.get('/:id', jobController.getJobById);
router.put('/:id', verifyToken, isAdmin, jobController.updateJob);
router.delete('/:id', verifyToken, isAdmin, jobController.deleteJob);
router.post('/apply', jobController.applyJob);
router.post('/quote', jobController.sendQuoteRequest);

module.exports = router;
