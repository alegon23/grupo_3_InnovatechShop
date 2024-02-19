const calcularDescuento = require('../public/js/calcularDescuento');
const path = require('path');
const calcularMiles = require('../public/js/calcularMiles');
const { validationResult } = require("express-validator");
const db = require('../database/models');
const fs = require('fs')

const productsController = {
    listado: async (req, res) =>{
        try {
            const titulo = "Todos los Productos";
            const data = await db.Product.findAll({
                include: ["images"],
            })

            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, calcularMiles});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
        
        
    },
    listadoCelulares: async (req, res) => {
        try {
            const titulo = "Celulares";
            const data = await db.Product.findAll({
                where: {idCategoryFK: 1},
                include: ["images"],
            });

            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, calcularMiles});

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
            
            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, calcularMiles});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    listadoTablets: async (req, res) => {
        try {
            const titulo = "Tablets";
            const data = await db.Product.findAll({
                where: {idCategoryFK: 3},
                include: ["images"],
            });

            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, calcularMiles});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    listadoNotebooks: async (req, res) => {
        try {
            const titulo = "Notebooks";
            const data = await db.Product.findAll({
                where: {idCategoryFK: 4},
                include: ["images"],
            });

            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, calcularMiles});
            
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    listadoHardware: async (req, res) => {
        try {
            const titulo = "Hardware";
            const data = await db.Product.findAll({
                where: {idCategoryFK: 5},
                include: ["images"],
            });

            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, calcularMiles});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    listadoAccesorios: async (req, res) => {
        try {
            const titulo = "Accesorios";
            const data = await db.Product.findAll({
                where: {idCategoryFK: 6},
                include: ["images"],
            });
            
            res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: data, calcularMiles});

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
            
            res.render(path.resolve('./', './src/views/products/detalleProducto'), {producto: data, calcularDescuento, calcularMiles});
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
}

module.exports = productsController;
