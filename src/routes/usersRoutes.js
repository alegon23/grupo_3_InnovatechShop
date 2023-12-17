const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const uploadImg = require("../middleware/userMulter");



router.get('/login', usersController.login);

router.get('/registro', usersController.registro);

router.post('/', uploadImg.single('avatar'), usersController.procesarRegistro);

module.exports = router;