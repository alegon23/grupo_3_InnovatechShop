const db = require('../../database/models');

const productsApiController = {
    //lista todos los productos
    list: async (req, res) => {
        try {
            //trae todos los productos (id, nombre, descripcion) cargados en la bd, incluyendo informacion solo la categoria
            const productsList = await db.Product.findAll({
                include: ["category"],
                attributes: {exclude: ["originalPrice", "onDiscount", "discount", "mainProduct", "stock", "idBrandFK"]},
            });
            //tre todas las categorias cargadas en la bd
            const categoryList = await db.Category.findAll();
            //array donde se almacenaran las categorias, y la cantidad del prodictos por categoria
            let countByCategory = [];
            //for que itera sobre las categorias obtenidas
            for (let i = 0; i < categoryList.length; i++) {
                //se hace un count de los productos  donde la clave foranea hace referencia a una categoria
                //que sea igual al id de la categoria donde se encuentra parado el for
                const cantidad = await db.Product.count({
                    where: {
                        idCategoryFK: categoryList[i].idCategory
                    }
                })
                //se pushea un objeto en el array que contiene el nommbre la categoria y la cantidad
                //de productos que pertenecen a esa categoria
                countByCategory.push({
                    categoria: categoryList[i].categoryName,
                    cantidad,
                })
            
            }
            //se realiza un map sobre los porductoss traidos de la bd
            //que devuelve un nuevo array que se almacena en products
            const products = productsList.map((product) => {
                return {
                    idProduct: product.idProduct,
                    productName: product.productName,
                    description: product.description,
                    category: product.category.categoryName,
                    detalle: `/api/products/${product.idProduct}`
                }
            })
            //respuesta al cliente
            res.json({
                meta: {
                    status: 200,
                    //cantidad de productos cargados en la bd
                    count: productsList.length,
                    //categorias y cant de productos por categoria
                    countByCategory,
                    url: req.originalUrl
                },
                //info de todos los productos
                products,
            })


        } catch (error){ 
            res.json({
                error: error.message
            })
        }

    },
    //muestra el detalle del producto
    detail: async (req, res) => {
        
        try {
            //se hace un findByPk para traer el primer producto que coincida con el id enviado,
            //incluyendo las asociaciones con las tablas de images, category, brand y features
            const data = await db.Product.findByPk(req.params.id, {
                include: ["images", "category", "brand", "features"], 
            });
            //se controla que data no venga vacio
            if(data){
                //hace un map sobre las imagenes traidas para obtener un array de urls
                const imagenes = data.images.map((imagen) => {
                    return imagen.url;

                });
                //hace un map sobre las caracteristicas traidas para obtener un array de caracteristicas
                const features = data.features.map((feature) => {
                    return feature.feature;
                });
                //se crea un objeto con el detalle del producto
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