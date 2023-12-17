const { body } = require('express-validator');

const validacionesProducto = [
    body('nombre').notEmpty().withMessage("Debes ingresar el nombre del producto"),
    body('marca').notEmpty().withMessage("Debes ingresar la marca del producto"),
    body('categoria').notEmpty().withMessage("Debes seleccionar una categoría"),
    body('precio').notEmpty().withMessage("Debes ingresar el precio del producto").bail().isInt({min: 0}).withMessage('El precio debe ser un numero positivo'),
    body('porcentaje').notEmpty().withMessage("Debes ingresar el porcentaje de descuento").bail().isInt({min: 0}).withMessage('El porcentaje debe ser un numero positivo o cero'),
    body('esDestacado').notEmpty().withMessage("Debes seleccionar una opcion").bail().custom((value, {req}) => {
        const porcentaje = req.body.porcentaje;
        const esDestacado = req.body.esDestacado;

        if(porcentaje != 0 && esDestacado == "true"){
            throw new Error('Los productos con descuento no pueden ser destacados');
        }
        
        return true;
    }),
    body('caracteristica1').notEmpty().withMessage("Debes ingresar el titulo de la caracteristica"),
    body('descripcion1').notEmpty().withMessage("Debes ingresar la descripcion de la caracteristica"),
    body('caracteristica2').notEmpty().withMessage("Debes ingresar el titulo de la caracteristica"),
    body('descripcion2').notEmpty().withMessage("Debes ingresar la descripcion de la caracteristica"),
    body('caracteristica3').notEmpty().withMessage("Debes ingresar el titulo de la caracteristica"),
    body('descripcion3').notEmpty().withMessage("Debes ingresar la descripcion de la caracteristica"),
    body('caracteristica4').notEmpty().withMessage("Debes ingresar el titulo de la caracteristica"),
    body('descripcion4').notEmpty().withMessage("Debes ingresar la descripcion de la caracteristica"),
];

//! Faltan validar las imagenes

module.exports = validacionesProducto;