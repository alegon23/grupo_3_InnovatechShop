const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const uploadImg = require("../middleware/multer");

router.get('/', productsController.listado);

router.get('/carrito', productsController.carrito);

router.get('/detalleProducto/:id', productsController.detalle);

router.get('/crearProducto', productsController.crear);
const uploadImgs = uploadImg.fields([{ name: 'imagen-principal', maxCount: 1 }, { name: 'imagenes-extra' }])
router.post('/', uploadImgs, productsController.guardar);

router.get('/editarProducto/:id', productsController.editar);
router.put('/editarProducto/:id', productsController.actualizar);



/*router.post('/products', productsController.actualizar)
/products/ :id (DELETE) → Acción de borrado */

module.exports = router;