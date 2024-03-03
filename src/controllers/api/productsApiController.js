const db = require('../../database/models');

const productsApiController = {
    list: async (req, res) => {
        try {
            const productsList = await db.Product.findAll({
                include: ["category"],
                attributes: {exclude: ["originalPrice", "onDiscount", "discount", "mainProduct", "stock", "idBrandFK"]},
            });

            const categoryList = await db.Category.findAll();

            let countByCategory = [];

            for (let i = 0; i < categoryList.length; i++) {
                const cantidad = await db.Product.count({
                    where: {
                        idCategoryFK: categoryList[i].idCategory
                    }
                })

                countByCategory.push({
                    categoria: categoryList[i].categoryName,
                    cantidad,
                })
            
            }

            const products = productsList.map((product) => {
                return {
                    idProduct: product.idProduct,
                    productName: product.productName,
                    description: product.description,
                    category: product.category.categoryName,
                    detalle: `/api/products/${product.idProduct}`
                }
            })

            res.json({
                meta: {
                    status: 200,
                    count: productsList.length,
                    countByCategory,
                    url: req.originalUrl
                },
                products,
            })


        } catch (error){ 
            res.json({
                error: error.message
            })
        }

    },
    
    detail: async (req, res) => {
        
        try {
            


        } catch (error) {
            res.json({
                error: error.message
            })
        }
    }
}

module.exports = productsApiController;