const { body } = require('express-validator');
const path = require('path');

const validacionesPerfil = [
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
    body('nuevaContrasenia').optional({ nullable: true, checkFalsy: true }).isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore:   false}).withMessage('La contraseña debe tener al menos 8 caracteres, contener una mayuscula y un numero').bail(),
    body('contraseniaActual').notEmpty().withMessage("Debes ingresar tu contraseña actual"),
    /*body('confirmarContrasenia').optional({ nullable: true, checkFalsy: true }).custom((value, {req}) => {
        const password = req.body.nuevaContrasenia;
        const confirmPassword = req.body.confirmarContrasenia;

        if(password != confirmPassword){
            throw new Error('Las contraseñas deben ser iguales');
        }
        
        return true;
    }),*/
    body('avatar').custom((value, {req}) => {
        const file = req.file;
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        
        if(file){
            const fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true;
    })
];

module.exports = validacionesPerfil;