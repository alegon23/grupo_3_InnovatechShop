const calcularDescuento = require('../data/calcularDescuento');
const path = require('path');
const products = require('../data/products');

const mainController = {
    index: (req, res) =>{
        res.render(path.resolve('./', './src/views/main/index'), {productos: products, calcularDescuento: calcularDescuento});
    }
}

module.exports = mainController;