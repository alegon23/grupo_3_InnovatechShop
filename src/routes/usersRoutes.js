const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const uploadImg = require("../middleware/userMulter");
const validacionesUsuario = require('../middleware/validatorUsers')
const validacionesLogin = require('../middleware/validatorLogin')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/login', guestMiddleware, usersController.login);

router.get('/registro', guestMiddleware, usersController.registro);

router.post('/', uploadImg.single('avatar'), validacionesUsuario, usersController.procesarRegistro);

router.post('/login', validacionesLogin, usersController.procesarLogin);

router.get('/perfil/:id', authMiddleware, usersController.mostrarPerfil);

router.get('/registro-admin', usersController.registroAdmin);

router.post('/registro-admin', usersController.procesarAdmin);

router.get('/logout', usersController.logout);

module.exports = router;
