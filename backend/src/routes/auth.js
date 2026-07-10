const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    return authController.register(req, res);
  }
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').exists(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    return authController.login(req, res);
  }
);

module.exports = router;
