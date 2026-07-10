const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const interviewController = require('../controllers/interviewController');

router.use(auth);

router.post('/start', body('title').optional().isString(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return interviewController.startInterview(req, res);
});

router.post('/message/:id', body('text').isString(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return interviewController.addMessage(req, res);
});

router.get('/history', (req, res) => interviewController.getHistory(req, res));

router.get('/:id', (req, res) => interviewController.getInterview(req, res));

module.exports = router;
