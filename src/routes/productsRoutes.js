const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const uploadImg = require("../middleware/multer");
const validacionesProducto = require('../middleware/validatorProd');

const uploadImgs = uploadImg.fields([{ name: 'imagen-principal', maxCount: 1 }, { name: 'imagenes-extra' }])

// Listado de productos
router.get('/', productsController.listado);
router.get('/celulares', productsController.listadoCelulares);
router.get('/monitores-tvs', productsController.listadoMonitoresTVs);
router.get('/tablets', productsController.listadoTablets);
router.get('/notebooks', productsController.listadoNotebooks);
router.get('/hardware', productsController.listadoHardware);
router.get('/accesorios', productsController.listadoAccesorios);

//Carrito
router.get('/carrito', productsController.carrito);

//Muestra el detalle
router.get('/detalleProducto/:id', productsController.detalle);

//Creacion de productos
router.get('/crearProducto', productsController.crear);

router.post('/', uploadImgs, validacionesProducto, productsController.guardar);

//Editar productos
router.get('/editarProducto/:id', productsController.editar);
router.put('/editarProducto/:id', uploadImgs, validacionesProducto, productsController.actualizar);

//Borrar productos
router.delete('/:id', productsController.borrar)

module.exports = router;
