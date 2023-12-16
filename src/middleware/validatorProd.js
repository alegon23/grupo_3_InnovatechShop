const { body } = require('express-validator');

const validacionesProducto = [
    body('nombre').notEmpty().withMessage("Debes ingresar el nombre del producto"),
    body('marca').notEmpty().withMessage("Debes ingresar la marca del producto").bail(),
    body('categoria').notEmpty().withMessage("Debes seleccionar una categoría").bail(),
    body('precio').notEmpty().withMessage("Debes ingresar el precio del producto").bail().isInt({min: 0}).withMessage('El precio debe ser un numero positivo').bail(),
    body('porcentaje').notEmpty().withMessage("Debes ingresar el porcentaje de descuento").bail().isInt({min: 0}).withMessage('El porcentaje debe ser un numero positivo').bail(),
    body('esDestacado').notEmpty().withMessage("Debes seleccionar una opcion").bail().custom((value, {req}) => {
        const porcentaje = req.body.porcentaje;
        const esDestacado = req.body.esDestacado;

        if(porcentaje != 0 && esDestacado == "true"){
            throw new Error('Los productos con descuento no pueden ser destacados');
        }
        
        return true;
    }).bail(),
    body('caracteristicas').isArray({min: 8, max: 8}).withMessage("Debes especificar todas las caracteristicas").bail().custom((value, {req}) => {
        for (let i = 0; i < req.body.caracteristicas.length; i++) {
            if (req.body.caracteristicas[i] == ""){
                throw new Error('Las caracteristicas y sus valores son obligatorias');
            }
        }

        return true;
    }),
];

//! Faltan validar las imagenes

module.exports = validacionesProducto;