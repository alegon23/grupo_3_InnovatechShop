const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const uploadImg = require("../middleware/multer");
const { route } = require('./mainRoutes');

const uploadImgs = uploadImg.fields([{ name: 'imagen-principal', maxCount: 1 }, { name: 'imagenes-extra' }])

router.get('/', productsController.listado);
router.get('/celulares', productsController.listadoCelulares);
router.get('/monitores-tvs', productsController.listadoMonitoresTVs);
router.get('/tablets', productsController.listadoTablets);
router.get('/notebooks', productsController.listadoNotebooks);
router.get('/hardware', productsController.listadoHardware);
router.get('/accesorios', productsController.listadoAccesorios);

router.get('/carrito', productsController.carrito);

router.get('/detalleProducto/:id', productsController.detalle);

router.get('/crearProducto', productsController.crear);

router.post('/', uploadImgs, productsController.guardar);

router.get('/editarProducto/:id', productsController.editar);
router.put('/editarProducto/:id', uploadImgs, productsController.actualizar);

router.delete('/:id', productsController.borrar)

module.exports = router;
