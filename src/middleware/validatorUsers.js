const { body } = require('express-validator');

const validacionesUsuario = [
    body('nombre').notEmpty().withMessage("Debes ingresar tu nombre"),
    body('apellido').notEmpty().withMessage("Debes ingresar tu apellido"),
    body('fecha').notEmpty().withMessage("Debes ingresar una fecha").bail()
                .custom((value, {req}) => {
                    const fechaDehoy = Date.now()
                    const fechaIngresada = new Date(req.body.fecha) 

                    if (fechaIngresada > fechaDehoy) {
                        throw new Error("Debes ingresar una fecha válida");
                    }

                    return true
                }),
    body('email').notEmpty().withMessage("Debes ingresar un email").bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('contrasenia').notEmpty().withMessage("Debes ingresar una contraseña").bail().isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false}).withMessage('La contraseña debe tener al menos 8 caracteres, contener una mayuscula y un numero'),
    body('confirmarContrasenia').notEmpty().withMessage("Debes ingresar una contraseña").bail().custom((value, {req}) => {
        const password = req.body.contrasenia;
        const confirmPassword = req.body.confirmarContrasenia;

        if(password != confirmPassword){
            throw new Error('Las contraseñas deben ser iguales');
        }
        
        return true;
    })
];

//! Faltan validar la imagen de perfil

module.exports = validacionesUsuario;