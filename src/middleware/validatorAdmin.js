const { body } = require('express-validator');

const validacionesAdministrador = [
    body('nombre').notEmpty().withMessage("Debes ingresar el nombre"),
    body('apellido').notEmpty().withMessage("Debes ingresar el apellido"),
    body('email').notEmpty().withMessage("Debes ingresar un email").bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('contrasenia').optional({ nullable: true, checkFalsy: true }).isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false}).withMessage('La contraseña debe tener al menos 8 caracteres, contener una mayuscula y un numero')
];

module.exports = validacionesAdministrador;