const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const uploadImg = require("../middleware/userMulter");
const validacionesUsuario = require('../middleware/validatorUsers')
const validacionesLogin = require('../middleware/validatorLogin')


router.get('/login', usersController.login);

router.get('/registro', usersController.registro);

router.post('/', uploadImg.single('avatar'), validacionesUsuario, usersController.procesarRegistro);

router.post('/login', validacionesLogin, usersController.procesarLogin);

module.exports = router;
