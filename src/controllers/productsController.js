const path = require('path');

const productsController = {
    carrito: (req, res) =>{
        res.render(path.resolve('./', './src/views/products/carrito'));
    },
    detalle: (req, res) =>{
        res.render(path.resolve('./', './src/views/products/detalleProducto'))
    },
    crear: (req, res) =>{
        res.render(path.resolve('./', './src/views/products/crearProducto'))
    },
}

module.exports = productsController;