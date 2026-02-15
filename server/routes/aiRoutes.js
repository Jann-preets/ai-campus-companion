const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, generateAIResponse);

module.exports = router;
