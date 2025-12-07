const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/salesController');

router.get('/', SalesController.getSales);
router.get('/filters', SalesController.getFilterOptions);

module.exports = router;
