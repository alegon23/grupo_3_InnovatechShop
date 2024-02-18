const { body } = require('express-validator');
const path = require('path');

const validacionesPerfil = [
    body('nombre').notEmpty().withMessage("Debes ingresar tu nombre").bail().isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido').notEmpty().withMessage("Debes ingresar tu apellido").bail().isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
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
    body('avatar').custom((value, {req}) => {
        const file = req.file;
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
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