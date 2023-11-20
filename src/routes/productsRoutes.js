const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/carrito', productsController.carrito);

router.get('/detalleProducto/:id', productsController.detalle);

router.get('/crearProducto', productsController.crear);

router.get('/editarProducto/:id', productsController.editar);

module.exports = router;