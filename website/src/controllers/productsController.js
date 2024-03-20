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

    listadoMonitoresTVs: async (req, res) => {
        try {
            const titulo = "Monitores & TVs";

            const data = await db.Product.findAll({
                where: {idCategoryFK: 2},
                include: ["images"],
            });

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
            console.log(categoria);
            console.log(idCategory);
            
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
                //attributes: {association: ["features"], exclude: [ "products_features" ]}
                
                
                //attributes: {exclude: [ 'updated_at' ]},
                //include: [{association: 'movies', attributes: {exclude: [ 'updated_at', 'created_at', 'genre_id' ]}}]
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
            const errors = validationResult(req);

            const data = await db.Product.findByPk(req.params.id, {
                include: ["images", "category", "brand", "features"]
            })

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
                
                return res.render(path.resolve('./', './src/views/products/editarProducto'), {errors: errors.mapped(), oldData: req.body, productID: data, categorias, marcas, caracteristicas});
            }

            let { nombre, marca, categoria, precio, descripcion, stock, porcentaje, esDestacado, caracteristica1, caracteristica2, caracteristica3, caracteristica4 } = req.body;

            const caracteristicasBody = [parseInt(caracteristica1), parseInt(caracteristica2), parseInt(caracteristica3), parseInt(caracteristica4)];

            function tiene_repetidos(array){
                return new Set(array).size!==array.length
            }


            if (tiene_repetidos(caracteristicasBody)) {
                
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

            
            //se edita el producto
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
            
            await db.Product.update(productoEditado, {
                where: {
                    idProduct: req.params.id
                }
            })
            
            //se pregunta si se recibieron imagenes preguntando si el objeto tiene alguna key. Si tiene, se recibieron imagenes, sino no
            //se editan imagenes si es que hay
            let newImagenPrincipal = '';
            let imagesArray = [];
            if(Object.keys(req.files).length){
                
                const imagenes = await db.Image.findAll({
                    where: {idProductFK: req.params.id}
                })

                if (req.files['imagenPrincipal']){
                    newImagenPrincipal = "/images/products/" + req.files['imagenPrincipal'][0].filename;

                    for (const imagen of imagenes) {
                        if (imagen.mainImage) {
                            const url = 'src\\public' + imagen.url.replace('/', '\\')
                            fs.unlinkSync(url)
                            break;
                        }
                    }                   
                }
        
                if (req.files['imagenesExtra']){
                    for(let i = 0; i < req.files['imagenesExtra'].length; i++){
                        imagesArray.push("/images/products/" + req.files['imagenesExtra'][i].filename);
                    }

                    for (const imagen of imagenes) {
                        if (!imagen.mainImage) {
                            const url = 'src\\public' + imagen.url.replace('/', '\\')
                            fs.unlinkSync(url)
                        }
                    }
                }
            }

            if (newImagenPrincipal != '') {
                await db.Image.destroy({
                    where: {
                        idProductFK: req.params.id,
                        mainImage: 1
                    }
                })

                await db.Image.create({
                    url: newImagenPrincipal,
                    mainImage: 1,
                    idProductFK: req.params.id
                })
            }

            if (imagesArray.length != 0) {
                await db.Image.destroy({
                    where: {
                        idProductFK: req.params.id,
                        mainImage: 0
                    }
                })

                for (let i = 0; i < imagesArray.length; i++) {
                    await db.Image.create({
                        url: imagesArray[i],
                        mainImage: 0,
                        idProductFK: req.params.id
                    })
                }
            }

            //se editan las caracteristicas
            const idsProductsFeatures = await db.ProductFeature.findAll({
                where: {
                    idProductFK: req.params.id
                },
                attributes: {exclude: [ 'idProductFK', 'idFeatureFK' ]},
            })


            for (let i = 0; i < caracteristicasBody.length; i++) {
            
                await db.ProductFeature.update({
                    idProductFK: req.params.id,
                    idFeatureFK: caracteristicasBody[i]
                }, {
                    where: {
                        idProductsFeatures: idsProductsFeatures[i].idProductsFeatures
                    }
                })
            }

            res.redirect('/products');
            
        } catch (error) {
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
        // console.log(marca);

        try {

            if (!caracteristica) {
                throw new Error('Debes seleccionar una caracteristica')
            }

            const feature = await db.Feature.findOne({
                where: {
                    idFeature: caracteristica
                }
            })

            if (caracteristica == feature.idFeature) {
                await db.Feature.destroy({
                    where: { idFeature: caracteristica }
                })

                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: `La caracteristica ${feature.feature} se dió de baja`});
            } 

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    borrarMarca: async (req, res) => {
        const marca = req.body.marcaSelect;
        // console.log(marca);

        try {

            if (!marca) {
                throw new Error('Debes seleccionar una marca')
            }

            const brand = await db.Brand.findOne({
                where: {
                    idBrand: marca
                }
            })

            if (marca == brand.idBrand) {
                await db.Brand.destroy({
                    where: { idBrand: marca }
                })

                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: `La marca ${brand.brandName} se dió de baja`});
            } 

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    borrarCategoria: async (req, res) => {
        const categoria = req.body.categoriaSelect;
        // console.log(categoria);

        try {

            if (!categoria) {
                throw new Error('Debes seleccionar una categoria')
            }

            const category = await db.Category.findOne({
                where: {
                    idCategory: categoria
                }
            })
            console.log(category);

            if (categoria == category.idCategory) {
                await db.Category.destroy({
                    where: { idCategory: categoria }
                })

                return res.render(path.resolve('./', './src/views/users/menuAdmin'), {mensajeBorrar: `La categoría ${category.categoryName} se dió de baja`});
            } 

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    }
}

module.exports = productsController;
