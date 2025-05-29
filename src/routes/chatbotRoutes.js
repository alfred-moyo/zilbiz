const express = require('express');
const { handleChatRequest } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/', handleChatRequest);

module.exports = router;
