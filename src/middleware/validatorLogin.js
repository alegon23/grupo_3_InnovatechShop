const { body } = require('express-validator');

const validacionesLogin = [
    body('email').notEmpty().withMessage("Debes ingresar un email").bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('contrasenia').notEmpty().withMessage("Debes ingresar una contraseña"),
];

module.exports = validacionesLogin;
