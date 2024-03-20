const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const uploadImg = require("../middleware/multer");
const validacionesProducto = require('../middleware/validatorProd');
const validacionesProductoEditar = require('../middleware/validatorProdEdit');
const {validacionesCaracteristicas, validacionesCategoria, validacionesMarca} = require('../middleware/validatorMenuAdmin')
const guestAdminMiddleware = require('../middleware/guestAdminMiddleware')
const authAdminMiddleware = require('../middleware/authAdminMiddleware')

const uploadImgs = uploadImg.fields([{ name: 'imagenPrincipal', maxCount: 1 }, { name: 'imagenesExtra' }])

// Listado de productos
router.get('/', productsController.listado);

//Carrito
router.get('/carrito', guestAdminMiddleware, productsController.carrito);

//Muestra el detalle
router.get('/detalleProducto/:id', productsController.detalle);

//Creacion de productos
router.get('/crearProducto', authAdminMiddleware, productsController.crear);
router.post('/', uploadImgs, validacionesProducto, productsController.guardar);

//Editar productos
router.get('/editarProducto/:id', authAdminMiddleware, productsController.editar);
router.put('/editarProducto/:id', uploadImgs, validacionesProductoEditar, productsController.actualizar);

//para menu admin -> marca
router.post('/nuevaMarca', validacionesMarca, productsController.crearMarca)

//para menu admin -> categoria
router.post('/nuevaCategoria', validacionesCategoria, productsController.crearCategoria)

//para menu admin -> caracteristicas
router.post('/nuevaCaracteristica', validacionesCaracteristicas, productsController.crearCaracteristica)

//Validacion del menu admin
router.get('/validate/brand/:marca', productsController.validateMarca)

router.get('/validate/category/:categoria', productsController.validateCategoria)

router.get('/validate/feature/:feature', productsController.validateCaracteristica)

//Borrar caracteristica
router.delete('/feature', authAdminMiddleware, productsController.borrarCaracteristica)

//Borrar marca
router.delete('/brand', authAdminMiddleware, productsController.borrarMarca)

//Borrar categoria
router.delete('/category', authAdminMiddleware, productsController.borrarCategoria)

//Borrar productos
router.delete('/:id', authAdminMiddleware, productsController.borrar)

//listado de productos por categoria
router.get('/:categoria', productsController.listadoCategorias)


module.exports = router;
