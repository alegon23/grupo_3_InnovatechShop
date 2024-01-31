const calcularDescuento = require('../public/js/calcularDescuento');
const path = require('path');
const calcularMiles = require('../public/js/calcularMiles');
const db = require('../database/models');

const mainController = {
    index: async (req, res) => {
        try {
            const data = await db.Product.findAll({
                include: ["images"],
            })
            res.render(path.resolve('./', './src/views/main/index'), {productos: data, calcularDescuento: calcularDescuento, calcularMiles});

        } catch (error) {
            res.send(error)
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
            const titulo = "Resultados de la búsqueda: \"" + busqueda + "\"";
            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, calcularMiles});
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = mainController;