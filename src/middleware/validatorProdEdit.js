const { body } = require('express-validator');
const path = require('path');

const validacionesProductoEditar = [
    body('nombre').notEmpty().withMessage("Debes ingresar el nombre del producto"),
    body('marca').notEmpty().withMessage("Debes ingresar la marca del producto"),
    body('categoria').notEmpty().withMessage("Debes seleccionar una categoría"),
    body('precio').notEmpty().withMessage("Debes ingresar el precio del producto").bail().isInt({min: 0}).withMessage('El precio debe ser un numero positivo'),
    body('stock').notEmpty().withMessage("Debes ingresar el stock del producto").bail().isInt({min: 0}).withMessage('El stock debe ser un numero positivo'),
    body('porcentaje').notEmpty().withMessage("Debes ingresar el porcentaje de descuento").bail().isInt({min: 0}).withMessage('El porcentaje debe ser un numero positivo o cero'),
    body('esDestacado').notEmpty().withMessage("Debes seleccionar una opcion").bail().custom((value, {req}) => {
        const porcentaje = req.body.porcentaje;
        const esDestacado = req.body.esDestacado;

        if(porcentaje != 0 && esDestacado == "true"){
            throw new Error('Los productos con descuento no pueden ser destacados');
        }
        
        return true;
    }),
    body('imagenPrincipal').custom((value, {req}) => {
        const { imagenPrincipal } = req.files;
        
        if(imagenPrincipal) {
            const file = imagenPrincipal[0];
            const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
            const fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true;
    }),
    body('imagenesExtra').custom((value, {req}) => {
        const { imagenesExtra } = req.files;
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        
        if(imagenesExtra){
           for(let i = 0; i < imagenesExtra.length; i++){
                const fileExtension = path.extname(imagenesExtra[i].originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
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

module.exports = validacionesProductoEditar;