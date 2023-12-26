const { body } = require('express-validator');

//!validar que el mail ya exista

const validacionesLogin = [
    body('email').notEmpty().withMessage("Debes ingresar un email").bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('contrasenia').notEmpty().withMessage("Debes ingresar una contraseña"),
];

module.exports = validacionesLogin;
