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
            const data = await db.Product.findByPk(req.params.id, {
                include: ["images", "category", "brand", "features"], 
            });
            if(data){
                const imagenes = data.images.map((imagen) => {
                    return imagen.url;

                });
                const features = data.features.map((feature) => {
                    return feature.feature;
                });
                const product={
                        idProduct: data.idProduct,
                        productName: data.productName,
                        originalPrice: data.originalPrice,
                        onDiscount: data.onDiscount,
                        discount: data.discount,
                        mainProduct: data.mainProduct,
                        description: data.description,
                        stock: data.stock,
                        category: data.category.categoryName,
                        brand: data.brand.brandName,
                        imagenes,
                        features,
                    };
    
                res.json({
                    meta: {
                        status: 200,
                        url: req.originalUrl
                    },
                    product,
                })
            }else{
                throw new Error("Producto inexistente");
            }

        } catch (error) {
            res.json({
                error: error.message
            })
        }
    }
}

module.exports = productsApiController;