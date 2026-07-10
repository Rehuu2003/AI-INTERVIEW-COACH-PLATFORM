const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

router.use(auth);

router.get('/history', analyticsController.userHistory);
router.get('/trends', analyticsController.trends);

module.exports = router;
