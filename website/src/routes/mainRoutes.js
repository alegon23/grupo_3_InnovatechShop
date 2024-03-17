const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', mainController.index);

router.get('/search', mainController.search);

router.get('/about', mainController.about);

router.get('/help', mainController.help);

module.exports = router;