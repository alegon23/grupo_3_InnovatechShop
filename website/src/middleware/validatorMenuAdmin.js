const { body } = require('express-validator');

const validacionesMarca = [
    body('nombreMarca').notEmpty().withMessage("Debes ingresar la marca"),
];

const validacionesCategoria = [
    body('nombreCategoria').notEmpty().withMessage("Debes ingresar la categoría"),
];

const validacionesCaracteristicas = [
    body('nombreCaracteristica').notEmpty().withMessage("Debes ingresar el nombre de la característica"),
    body('descriptCaracteristica').notEmpty().withMessage("Debes ingresar la descripción de la característica"),
];

module.exports = {validacionesMarca, validacionesCategoria, validacionesCaracteristicas};