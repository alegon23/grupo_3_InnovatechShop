const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const uploadImg = require("../middleware/multer");
const validacionesProducto = require('../middleware/validatorProd');
const guestAdminMiddleware = require('../middleware/guestAdminMiddleware')
const authAdminMiddleware = require('../middleware/authAdminMiddleware')

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
router.get('/carrito', guestAdminMiddleware, productsController.carrito);

//Muestra el detalle
router.get('/detalleProducto/:id', productsController.detalle);

//Creacion de productos
router.get('/crearProducto', authAdminMiddleware, productsController.crear);

router.post('/', uploadImgs, validacionesProducto, productsController.guardar);

//Editar productos
router.get('/editarProducto/:id', authAdminMiddleware, productsController.editar);
router.put('/editarProducto/:id', uploadImgs, validacionesProducto, productsController.actualizar);

//Borrar productos
router.delete('/:id', authAdminMiddleware, productsController.borrar)

module.exports = router;
