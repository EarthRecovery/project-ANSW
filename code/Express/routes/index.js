const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const articleRoutes = require('./article');

router.use('/users', userRoutes);

router.use('/article', articleRoutes);

module.exports = router;
