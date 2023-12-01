const calcularDescuento = require('../data/calcularDescuento');
const path = require('path');
const products = require('../data/products');
const calcularMiles = require('../data/calcularMiles');

const mainController = {
    index: (req, res) =>{
        res.render(path.resolve('./', './src/views/main/index'), {productos: products, calcularDescuento: calcularDescuento, calcularMiles});
    },

    search: (req, res) =>{
        const busqueda = req.query.keywords.toLowerCase();
		const resultados = products.filter(product => product.name.toLowerCase().includes(busqueda));
        const titulo = "Resultados de la búsqueda: \"" + busqueda + "\"";
		res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados, calcularMiles});
    }
}

module.exports = mainController;