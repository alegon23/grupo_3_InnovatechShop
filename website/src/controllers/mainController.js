const calcularDescuento = require('../public/js/calcularDescuento');
const path = require('path');
const calcularMiles = require('../public/js/calcularMiles');
const db = require('../database/models');

const mainController = {
    index: async (req, res) => {
        try {
            const data = await db.Product.findAll({
                include: ["images", "category"],
            })

            const categorias = await db.Category.findAll({})

            res.render(path.resolve('./', './src/views/main/index'), {productos: data, categorias: categorias, calcularDescuento: calcularDescuento, calcularMiles});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    search: async (req, res) => {
        try {
            const busqueda = req.query.keywords;
            const data = await db.Product.findAll({
                include: ["images"],
                where: {
                    productName: {
                        [db.Sequelize.Op.like]: `%${busqueda}%`
                    }
                }
            });

            const categorias = await db.Category.findAll({})

            const titulo = "Resultados de la búsqueda: \"" + busqueda + "\"";
            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, categorias: categorias, calcularMiles});
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    about: async (req, res) => {
        try {
            const categorias = await db.Category.findAll({})
            res.render(path.resolve('./', './src/views/main/about'), {categorias: categorias});  
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    help: async (req, res) => {
        try {
            const categorias = await db.Category.findAll({})
            res.render(path.resolve('./', './src/views/main/help'), {categorias: categorias});
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    }
}

module.exports = mainController;