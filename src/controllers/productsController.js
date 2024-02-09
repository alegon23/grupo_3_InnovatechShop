const calcularDescuento = require('../public/js/calcularDescuento');
const path = require('path');
//const fs = require('fs');
//const productsJSON = path.join(__dirname, '../data/products.json');
//let products = require('../data/products');
const calcularMiles = require('../public/js/calcularMiles');
const { validationResult } = require("express-validator");
const db = require('../database/models');

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
            //res.json(data)
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
        
        if (!errors.isEmpty()) {
            const categorias = await db.Category.findAll();
            const marcas = await db.Brand.findAll();
            const caracteristicas = await db.Feature.findAll();
            return res.render(path.resolve('./', './src/views/products/crearProducto'), {errors: errors.mapped(), oldData: req.body, categorias, marcas, caracteristicas});
        }

        let { nombre, marca, categoria, precio, descripcion, porcentaje, esDestacado, stock, caracteristica1, caracteristica2, caracteristica3, caracteristica4} = req.body;

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
            //images: { url: "/images/products/" + req.files['imagenPrincipal'][0].filename, mainImage: 1},
        }

        const productoBD = await db.Product.create(nuevoProducto);
        /*, {
            include: [{
                association: db.Image,
                as: 'images'
            }, {
                association: db.Feature,
                as: 'features'
            }]
        });*/

        //res.json(productoBD)

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
            idProductFK: productoBD.productID
        })

        if (imagesArray){
            for(let i = 0; i < imagesArray.length; i++){
                await db.Image.create({
                    url: imagesArray[i],
                    mainImage: 0,
                    idProductFK: productoBD.productID
                })
            }
        }
        

        //se cargan los datos en la tabla pivot de productos-caracteristicas
        const caracteristicas = [caracteristica1, caracteristica2, caracteristica3, caracteristica4];
        for (let i = 0; i < caracteristicas.length; i++) {
            await db.ProductFeature.create({
                idProductFK: productoBD.productID,
                idFeatureFK: caracteristicas[i]
            })
        }

        res.redirect('/products');
    },

    editar: async (req, res) => {
        try {
            const data = await db.Product.findByPk(req.params.id, {
                include: ["images", "category", "brand", "features"]
            })

            const categorias = await db.Category.findAll() 
            const marcas = await db.Brand.findAll() 
            
            const caracteristicas = await db.Feature.findAll()
            let titulos = []
            for (let i = 0; i < caracteristicas.length; i++) {
                titulos.push(caracteristicas[i].feature)
            }
            const titulosFiltrados = titulos.filter(function(item, index, array) {
                return array.indexOf(item) === index;
            })

            res.render(path.resolve('./', './src/views/products/editarProducto'), {productID: data, categorias, marcas, caracteristicas, titulosFiltrados});
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    actualizar: async (req, res) => {

        try {
            
            const data = await db.Product.findByPk(req.params.id, {
                include: ["images", "category", "brand", "features"]
            })
            
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                return res.render(path.resolve('./', './src/views/products/editarProducto'), {errors: errors.mapped(), oldData: req.body, productID: data});
            }

            let { nombre, marca, categoria, precio, descripcion, stock, porcentaje, esDestacado, caracteristica1, caracteristica2, caracteristica3, caracteristica4, descripcion1, descripcion2, descripcion3, descripcion4 } = req.body;
            const descuento = porcentaje == 0 ? 0 : 1;

            
            let productoEditado = {
                productName: nombre,
                originalPrice: precio,
                onDiscount: descuento,
                discount: porcentaje,
                mainProduct: esDestacado === 'true'? 1 : 0,
                description: descripcion,
                stock: stock,
                idCategoryFK: categoria,
                idBrandFK: marca,
            }
            
            //! FALTABA EL WHERE ----------------------------------------------------
            await db.Product.update(productoEditado, {
                where: {
                    idProduct: req.params.id
                }
            })
            
            //se pregunta si se recibieron imagenes preguntando si el objeto tiene alguna key. Si tiene, se recibieron imagenes, sino no
            let newImagenPrincipal = '';
            let imagesArray = [];
            if(Object.keys(req.files).length){
                if (req.files['imagenPrincipal']){
                    newImagenPrincipal = "/images/products/" + req.files['imagenPrincipal'][0].filename;
                }
        
                if (req.files['imagenesExtra']){
                    for(let i = 0; i < req.files['imagenesExtra'].length; i++){
                        imagesArray.push("/images/products/" + req.files['imagenesExtra'][i].filename)
                    }
                }
            }

            //! FALTABA EL WHERE ----------------------------------------------------
            if (newImagenPrincipal != '') {
                await db.Image.update({
                    url: newImagenPrincipal,
                    mainImage: 1,
                    idProductFK: req.params.id
                },{
                    where: {
                        idProductFK: req.params.id
                    }
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

            /*const caracteristicas = await db.Feature.findAll() // trae las caracteristicas de la bd

            const descripcionesCaracteristicas = [descripcion1, descripcion2, descripcion3, descripcion4] // descripciones de la caracteristica del req.body
            
            

            let descripciones = []
            for (let i = 0; i < caracteristicas.length; i++) {
                descripciones.push(caracteristicas[i].featureDescription)
            }
            const descripcionesFiltradas = descripciones.filter(function(item, index, array) { // descripciones unicas de la bd
                return array.indexOf(item) === index;
            })

            for (let i = 0; i < descripcionesCaracteristicas.length; i++) {
                if (!descripcionesFiltradas.includes(descripcionesCaracteristicas[i])) {
                    await db.Feature.create({
                        feature: caracteristica1
                    })
                }
            }*/

            res.redirect('/products');
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }

    },
    
    borrar: async (req, res) => {
        try {
            const idProd = req.params.id

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
