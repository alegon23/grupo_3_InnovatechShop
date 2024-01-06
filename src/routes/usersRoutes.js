const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const uploadImg = require("../middleware/userMulter");
const validacionesUsuario = require('../middleware/validatorUsers')
const validacionesLogin = require('../middleware/validatorLogin')
const validacionesAdministrador = require('../middleware/validatorAdmin')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const authAdminMiddleware = require('../middleware/authAdminMiddleware')

//Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validacionesLogin, usersController.procesarLogin);

//Registro usuarios
router.get('/registro', guestMiddleware, usersController.registro);
router.post('/', uploadImg.single('avatar'), validacionesUsuario, usersController.procesarRegistro);

//Perfil
router.get('/perfil/:id', authMiddleware, usersController.mostrarPerfil);

//Registro administradores
router.get('/registro-admin', authAdminMiddleware, usersController.registroAdmin);
router.post('/registro-admin', validacionesAdministrador, usersController.procesarAdmin);

//Logout
router.get('/logout', usersController.logout);

module.exports = router;
