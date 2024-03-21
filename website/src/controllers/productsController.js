const calcularDescuento = require('../public/js/calcularDescuento');
const path = require('path');
const calcularMiles = require('../public/js/calcularMiles');
const { validationResult } = require("express-validator");
const db = require('../database/models');
const fs = require('fs');

const productsController = {
    listado: async (req, res) =>{
        try {
            const titulo = "Todos los Productos";
            const data = await db.Product.findAll({
                include: ["images"],
            })

            const categorias = await db.Category.findAll({})

            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, categorias: categorias, calcularMiles});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    
    listadoCategorias: async (req, res) => {
        try {
            const tituloCaract = req.params.categoria
            const titulo = tituloCaract;

            const categoria = await db.Category.findAll({
                where: { categoryName: titulo }
            })

            const idCategory = categoria[0].idCategory
            
            const data = await db.Product.findAll({
                where: { idCategoryFK: idCategory },
                include: ["images"],
            })

            const categorias = await db.Category.findAll()

            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, categorias: categorias, calcularMiles});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    carrito: (req, res) =>{
        res.render(path.resolve('./', './src/views/products/carrito'));
    },

    detalle: async (req, res) =>{
        try {
            const data = await db.Product.findByPk(req.params.id, {
                include: ["images", "category", "brand", "features"], 
            })

            const categorias = await db.Category.findAll({})
            
            res.render(path.resolve('./', './src/views/products/detalleProducto'), {producto: data, categorias: categorias, calcularDescuento, calcularMiles});
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    crear: async (req, res) =>{
        try {
            const categorias = await db.Category.findAll();
            const marcas = await db.Brand.findAll();
            const caracteristicas = await db.Feature.findAll();

            res.render(path.resolve('./', './src/views/products/crearProducto'), {categorias, marcas, caracteristicas})
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
        
    },

    guardar: async (req, res) =>{
        const errors = validationResult(req);

        const categorias = await db.Category.findAll();
        const marcas = await db.Brand.findAll();
        const caracteristicas = await db.Feature.findAll();
        
        if (!errors.isEmpty()) {
            if(Object.keys(req.files).length){
                if (req.files['imagenPrincipal']){
                    fs.unlinkSync(req.files['imagenPrincipal'][0].path)
                }
        
                if (req.files['imagenesExtra']){
                    for(let i = 0; i < req.files['imagenesExtra'].length; i++){
                        fs.unlinkSync(req.files['imagenesExtra'][i].path)
                    }
                }
            }

            return res.render(path.resolve('./', './src/views/products/crearProducto'), {errors: errors.mapped(), oldData: req.body, categorias, marcas, caracteristicas});
        }

        let { nombre, marca, categoria, precio, descripcion, porcentaje, esDestacado, stock, caracteristica1, caracteristica2, caracteristica3, caracteristica4} = req.body;

        const caracteristicasBody = [parseInt(caracteristica1), parseInt(caracteristica2), parseInt(caracteristica3), parseInt(caracteristica4)];
        
        function tiene_repetidos(array){
            return new Set(array).size!==array.length
        }

        if (tiene_repetidos(caracteristicasBody)) {
            return res.render(path.resolve('./', './src/views/products/crearProducto'), {
                errors: {
                    caracteristica1: {
                        msg: 'Las características deben ser diferentes entre sí'
                    },
                    caracteristica2: {
                        msg: 'Las características deben ser diferentes entre sí'
                    },
                    caracteristica3: {
                        msg: 'Las características deben ser diferentes entre sí'
                    },
                    caracteristica4: {
                        msg: 'Las características deben ser diferentes entre sí'
                    }
                },
                oldData: req.body,
                categorias,
                marcas,
                caracteristicas
            });
        }

       
        //se da de alta el producto
        let nuevoProducto = {
            productName: nombre,
            originalPrice: precio,
            onDiscount: porcentaje == 0 ? 0 : 1,
            discount: porcentaje,
            mainProduct: esDestacado === 'true' ? 1 : 0,
            description: descripcion,
            stock: stock,
            idCategoryFK: categoria,
            idBrandFK: marca,
        }

        const productoBD = await db.Product.create(nuevoProducto);

        //* documentacion: https://github.com/expressjs/multer/blob/master/doc/README-es.md
        //se dan de alta las imagenes
        let imagesArray = [];

        if(req.files['imagenesExtra']){
            for(let i = 0; i < req.files['imagenesExtra'].length; i++){
                imagesArray.push("/images/products/" + req.files['imagenesExtra'][i].filename)
            }
        }

        const imagenPrincipal = "/images/products/" + req.files['imagenPrincipal'][0].filename;

        await db.Image.create({
            url: imagenPrincipal,
            mainImage: 1,
            idProductFK: productoBD.idProduct
        })

        if (imagesArray){
            for(let i = 0; i < imagesArray.length; i++){
                await db.Image.create({
                    url: imagesArray[i],
                    mainImage: 0,
                    idProductFK: productoBD.idProduct
                })
            }
        }

        //se cargan los datos en la tabla pivot de productos-caracteristicas
        for (let i = 0; i < caracteristicasBody.length; i++) {
            await db.ProductFeature.create({
                idProductFK: productoBD.idProduct,
                idFeatureFK: caracteristicasBody[i]
            })
        }

        res.redirect('/products');
    },

    editar: async (req, res) => {
        try {
            const data = await db.Product.findByPk(req.params.id, {
                include: ["images", "category", "brand", "features"]
            })

            const categorias = await db.Category.findAll();
            const marcas = await db.Brand.findAll();
            const caracteristicas = await db.Feature.findAll();

            res.render(path.resolve('./', './src/views/products/editarProducto'), {productID: data, categorias, marcas, caracteristicas});
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    actualizar: async (req, res) => {
        try {
            //obtenemos errores de express validation
            const errors = validationResult(req);

            //se trae de BD toda la info de los productos
            const data = await db.Product.findByPk(req.params.id, {
                include: ["images", "category", "brand", "features"]
            })

            //se trae de BD todas las categorias, marcas y caracteristicas
            const categorias = await db.Category.findAll();
            const marcas = await db.Brand.findAll();
            const caracteristicas = await db.Feature.findAll();

            //se pregunta si hay algun error
            if (!errors.isEmpty()) {
                //si es cierto -> pregunta si hay imagenes subidas
                if(Object.keys(req.files).length){
                    //si es cierto -> pregunta si se subio una imagen principal
                    if (req.files['imagenPrincipal']){
                        //si es cierto -> la elimina
                        fs.unlinkSync(req.files['imagenPrincipal'][0].path)
                    }
            
                    //luego pregunta si se subieron imagenes extra
                    if (req.files['imagenesExtra']){
                        //si es cierto -> se las elimina
                        for(let i = 0; i < req.files['imagenesExtra'].length; i++){
                            fs.unlinkSync(req.files['imagenesExtra'][i].path)
                        }
                    }
                }
                
                //se retorna a la vista informando de los errores, junto con la info de la BD necesaria
                return res.render(path.resolve('./', './src/views/products/editarProducto'), {errors: errors.mapped(), oldData: req.body, productID: data, categorias, marcas, caracteristicas});
            }

            //si no hay errores -> se obtiene la info del req.body
            let { nombre, marca, categoria, precio, descripcion, stock, porcentaje, esDestacado, caracteristica1, caracteristica2, caracteristica3, caracteristica4 } = req.body;

            //se crea un array con los IDs de las caracteristicas para manipularlas más comodamente
            const caracteristicasBody = [parseInt(caracteristica1), parseInt(caracteristica2), parseInt(caracteristica3), parseInt(caracteristica4)];

            //se crea una funcion que nos permite saber si hay elementos repetidos en un array
            function tiene_repetidos(array){
                return new Set(array).size!==array.length
            }

            //si tiene repetidos el array de caracteristicas
            if (tiene_repetidos(caracteristicasBody)) {
                //se retorna a la vista indicando el error + su info necesaria
                return res.render(path.resolve('./', './src/views/products/editarProducto'), {
                    errors: {
                        caracteristica1: {
                            msg: 'Las características deben ser diferentes entre sí' 
                        },
                        caracteristica2: {
                            msg: 'Las características deben ser diferentes entre sí'
                        },
                        caracteristica3: {
                            msg: 'Las características deben ser diferentes entre sí'
                        },
                        caracteristica4: {
                            msg: 'Las características deben ser diferentes entre sí'
                        }
                    },
                    oldData: req.body,
                    productID: data,
                    categorias,
                    marcas,
                    caracteristicas
                });
            }

            //si no hay errores en las caracteristicas -> todo esta bien y se procede a editar los datos correspondientes
            //PRIMERO -> se crea un objeto con la informacion del producto
            let productoEditado = {
                productName: nombre,
                originalPrice: precio,
                onDiscount: porcentaje == 0 ? 0 : 1,
                discount: porcentaje,
                mainProduct: esDestacado === 'true' ? 1 : 0,
                description: descripcion,
                stock: stock,
                idCategoryFK: categoria,
                idBrandFK: marca,
            }
            
            //y se lo actualiza en la BD
            await db.Product.update(productoEditado, {
                where: {
                    idProduct: req.params.id
                }
            })
            
            //SEGUNDO -> se editan las imagenes si es que hay
            let newImagenPrincipal = '';
            let imagesArray = [];
            //se pregunta si se recibieron imagenes preguntando si el objeto tiene alguna key. Si tiene, se recibieron imagenes, sino no
            if(Object.keys(req.files).length){
                //se busca las imagenes en la BD segun el producto
                const imagenes = await db.Image.findAll({
                    where: {idProductFK: req.params.id}
                })

                //se pregunta si se edito la imagen principal
                if (req.files['imagenPrincipal']){
                    //si es cierto -> se crea la URL correspondiente
                    newImagenPrincipal = "/images/products/" + req.files['imagenPrincipal'][0].filename;

                    //se elimina la imagen principal guardada en el servidor con la info de la URL de la BD
                    for (const imagen of imagenes) {
                        if (imagen.mainImage) {
                            const url = 'src\\public' + imagen.url.replace('/', '\\')
                            fs.unlinkSync(url)
                            break;
                        }
                    }                   
                }
        
                //se pregunta si se editaron las imagenes extra
                if (req.files['imagenesExtra']){
                    //si es cierto -> se crea un array con las URLs correspondientes
                    for(let i = 0; i < req.files['imagenesExtra'].length; i++){
                        imagesArray.push("/images/products/" + req.files['imagenesExtra'][i].filename);
                    }

                    //se eliminan las imagenes extra guardadas en el servidor con la info de las URLs de la BD
                    for (const imagen of imagenes) {
                        if (!imagen.mainImage) {
                            const url = 'src\\public' + imagen.url.replace('/', '\\')
                            fs.unlinkSync(url)
                        }
                    }
                }
            }

            //si hay una imagen principal
            if (newImagenPrincipal != '') {
                //se elimina el registro correspondiente de la BD
                await db.Image.destroy({
                    where: {
                        idProductFK: req.params.id,
                        mainImage: 1
                    }
                })

                //y se da de alta la nueva en BD
                await db.Image.create({
                    url: newImagenPrincipal,
                    mainImage: 1,
                    idProductFK: req.params.id
                })
            }

            //si hay imagenes extra
            if (imagesArray.length != 0) {
                //se eliminan los registros correspondientes de la BD
                await db.Image.destroy({
                    where: {
                        idProductFK: req.params.id,
                        mainImage: 0
                    }
                })

                //y se dan de alta las nuevas en BD
                for (let i = 0; i < imagesArray.length; i++) {
                    await db.Image.create({
                        url: imagesArray[i],
                        mainImage: 0,
                        idProductFK: req.params.id
                    })
                }
            }

            //TERCERO -> se editan las caracteristicas
            //se traen las caracteristicas asociadas a los productos de la tabla pivot
            const idsProductsFeatures = await db.ProductFeature.findAll({
                where: {
                    idProductFK: req.params.id
                },
                attributes: {exclude: [ 'idProductFK', 'idFeatureFK' ]},
            })

            //por cada caracteristica del array creado al principio
            for (let i = 0; i < caracteristicasBody.length; i++) {
                //se actualizan a los nuevos IDs de las caracteristicas
                await db.ProductFeature.update({
                    idProductFK: req.params.id,
                    idFeatureFK: caracteristicasBody[i]
                }, {
                    where: {
                        idProductsFeatures: idsProductsFeatures[i].idProductsFeatures
                    }
                })
            }

            //finalmente, se redirige a la lista de todos los productos
            res.redirect('/products');
            
        } catch (error) {
            //si sucede algun error durante el proceso, se manda un mensaje a la vista de error
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }

    },
    
    borrar: async (req, res) => {
        try {
            const idProd = req.params.id

            const imagenes = await db.Image.findAll({
                where: { idProductFK: idProd }
            })
            
            for(const imagen of imagenes){
                const url = 'src\\public' + imagen.url.replace('/', '\\')
                fs.unlinkSync(url)
            }

            await db.Image.destroy({
                where: { idProductFK: idProd }
            });

            await db.ProductFeature.destroy({
                where: { idProductFK: idProd }
            });

            await db.Product.destroy({
                where: { idProduct: idProd }
            });
            
            res.redirect('/')
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    crearMarca: async (req, res) => {
        try {
            const errors = validationResult(req);
        
            if (!errors.isEmpty()) {
                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {errors: errors.mapped(), oldData: req.body});
            }

            let { nombreMarca } = req.body;

            const foundBrand = await db.Brand.findOne({
                where: {brandName: nombreMarca},
            })

            
            if (foundBrand != null) {
                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {
                    errors: {
                        nombreMarca: {
                            msg: 'Esta marca ya existe'
                        }
                    },
                    oldData: req.body
                });
            }
            
            await db.Brand.create({
                brandName: nombreMarca
            })

            return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensaje: `La marca ${nombreMarca} se dió de alta`});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    crearCategoria: async (req, res) => {
        try {
            const errors = validationResult(req);
        
             if (!errors.isEmpty()) {
                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {errors: errors.mapped(), oldData: req.body});
            }

            let { nombreCategoria } = req.body;

            const foundCategory = await db.Category.findOne({
                where: {categoryName: nombreCategoria},
            })

            if (foundCategory != null) {
               return res.render(path.resolve('./', './src/views/users/menuAdmin'), {
                    errors: {
                        nombreCategoria: {
                            msg: 'Esta categoria ya existe'
                        }
                    },
                    oldData: req.body
                });
            }

            await db.Category.create({
                categoryName: nombreCategoria
            })

            return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensaje: `La categoría ${nombreCategoria} se dió de alta`});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    crearCaracteristica: async (req, res) => {
        try {
            const errors = validationResult(req);
        
            if (!errors.isEmpty()) {
                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {errors: errors.mapped(), oldData: req.body});
            }

            let {nombreCaracteristica, descriptCaracteristica} = req.body;

            const caracteristicaCompleta = nombreCaracteristica + ": " + descriptCaracteristica;

            const foundFeature = await db.Feature.findOne({
                where: {
                    feature: {
                        [db.Sequelize.Op.like]: `%${caracteristicaCompleta}%`
                    }
                },
            })

            if (foundFeature != null) {
               return res.render(path.resolve('./', './src/views/users/menuAdmin'), {
                    errors: {
                        descriptCaracteristica: {
                            msg: 'Esta caracteristica ya existe'
                        }
                    },
                    oldData: req.body
                });
            }

            await db.Feature.create({
                feature: caracteristicaCompleta
            })

            return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensaje: `La caracteristica ${caracteristicaCompleta} se dió de alta`});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    validateMarca: async (req, res) => {
        try {
            const marca = req.params.marca
            const respuesta = await db.Brand.findOne({
                where: {brandName: marca}
            })

            if (respuesta) {
                res.json({
                    existe: true,
                })
            } else {
                res.json({
                    existe: false,
                })
            }

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
        
    },

    validateCategoria: async (req, res) => {
        try {
            const categoria = req.params.categoria
            const respuesta = await db.Category.findOne({
                where: {categoryName: categoria}
            })

            if (respuesta) {
                res.json({
                    existe: true,
                })
            } else {
                res.json({
                    existe: false,
                })
            }

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }

    },

    validateCaracteristica: async (req, res) => {
        try {
            const feature = req.params.feature
            const respuesta = await db.Feature.findOne({
                where: {
                    feature: {
                        [db.Sequelize.Op.like]: `%${feature}%`
                    }
                },
            })

            if (respuesta) {
                res.json({
                    existe: true,
                })
            } else {
                res.json({
                    existe: false,
                })
            }
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    borrarCaracteristica: async (req, res) => {
        const caracteristica = req.body.caracteristicaSelect;
        
        try {
            if (!caracteristica) {
                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: "Debes seleccionar una caracteristica para darla de baja"});
            }

            const feature = await db.Feature.findOne({
                where: {
                    idFeature: caracteristica
                }
            })

            await db.Feature.destroy({
                where: { idFeature: caracteristica }
            })

            return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: `La caracteristica ${feature.feature} se dió de baja`});
             

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    borrarMarca: async (req, res) => {
        const marca = req.body.marcaSelect;

        try {
            if (!marca) {
                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: "Debes seleccionar una marca para darla de baja"});
            }

            const brand = await db.Brand.findOne({
                where: {
                    idBrand: marca
                }
            })

            await db.Brand.destroy({
                where: { idBrand: marca }
            })

            return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: `La marca ${brand.brandName} se dió de baja`});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    borrarCategoria: async (req, res) => {
        const categoria = req.body.categoriaSelect;

        try {
            if (!categoria) {
                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: "Debes seleccionar una categoria para darla de baja"});
            }

            const category = await db.Category.findOne({
                where: {
                    idCategory: categoria
                }
            })

            await db.Category.destroy({
                where: { idCategory: categoria }
            })

            return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: `La categoría ${category.categoryName} se dió de baja`});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    }
}

module.exports = productsController;
