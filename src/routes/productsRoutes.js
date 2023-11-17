const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/carrito', productsController.carrito);

router.get('/detalleProducto', productsController.detalle);

router.get('/crearProducto', productsController.crear);

module.exports = router;