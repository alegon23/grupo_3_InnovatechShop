const calcularDescuento = require('../data/calcularDescuento');
const path = require('path');
const products = require('../data/products');

const productsController = {
    carrito: (req, res) =>{
        res.render(path.resolve('./', './src/views/products/carrito'));
    },
    detalle: (req, res) =>{
        const productID = products.find(producto => producto.id == req.params.id);
        res.render(path.resolve('./', './src/views/products/detalleProducto'), {productID, calcularDescuento: calcularDescuento})
    },
    crear: (req, res) =>{
        res.render(path.resolve('./', './src/views/products/crearProducto'))
    },
    editar: (req, res) =>{
        const productID = products.find(producto => producto.id == req.params.id);
        res.render(path.resolve('./', './src/views/products/editarProducto'), {productID})
    },
}

module.exports = productsController;