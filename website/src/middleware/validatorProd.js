const { body } = require('express-validator');
const path = require('path');

const validacionesProducto = [
    body('nombre').notEmpty().withMessage("Debes ingresar el nombre del producto").bail().isLength({ min:5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('marca').notEmpty().withMessage("Debes ingresar la marca del producto"),
    body('categoria').notEmpty().withMessage("Debes elegir una categoría"),
    body('precio').notEmpty().withMessage("Debes ingresar el precio del producto").bail().isNumeric({min: 1}).withMessage('El precio debe ser un numero positivo'),
    body('stock').notEmpty().withMessage("Debes ingresar el stock del producto").bail().isInt({min: 0}).withMessage('El stock debe ser mayor o igual a cero'),
    body('porcentaje').notEmpty().withMessage("Debes ingresar el porcentaje de descuento").bail().isInt({min: 0}).withMessage('El porcentaje debe ser mayor o igual a cero'),
    body('descripcion').isLength({ min: 20 }).withMessage('La descripcion debe tener al menos 20 caracteres'),
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
        
        if(!imagenPrincipal){
            throw new Error('Debes subir una imagen');
        } else {
            const file = imagenPrincipal[0];
            const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            const fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true;
    }),
    body('imagenesExtra').custom((value, {req}) => {
        const { imagenesExtra } = req.files;
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
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
    body('caracteristica1').notEmpty().withMessage("Debes seleccionar una caracteristica"),
    body('caracteristica2').notEmpty().withMessage("Debes seleccionar una caracteristica"),
    body('caracteristica3').notEmpty().withMessage("Debes seleccionar una caracteristica"),
    body('caracteristica4').notEmpty().withMessage("Debes seleccionar una caracteristica"),
];

module.exports = validacionesProducto;