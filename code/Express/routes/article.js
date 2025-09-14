const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const articleController = require('../controllers/articleController');

router.post('/createBlankArticle', authMiddleware, articleController.createBlankArticle);

module.exports = router;