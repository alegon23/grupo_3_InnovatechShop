const path = require('path');

const productsController = {
    carrito: (req, res) =>{
        res.sendFile(path.resolve('./', './src/views/products/carrito.html'));
    },
    detalle: (req, res) =>{
        res.sendFile(path.resolve('./', './src/views/products/detalleProducto.html'))
    },
    crear: (req, res) =>{
        res.sendFile(path.resolve('./', './src/views/products/crearProducto.html'))
    },
}

module.exports = productsController;