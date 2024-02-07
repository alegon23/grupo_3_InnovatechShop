const calcularDescuento = require('../public/js/calcularDescuento');
const path = require('path');
const fs = require('fs');
const productsJSON = path.join(__dirname, '../data/products.json');
let products = require('../data/products');
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

    crear: (req, res) =>{
        res.render(path.resolve('./', './src/views/products/crearProducto'))
    },

    guardar: (req, res) =>{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/products/crearProducto'), {errors: errors.mapped(), oldData: req.body});
        }

        let { nombre, marca, categoria, precio, descripcion, porcentaje, esDestacado, caracteristica1, caracteristica2, caracteristica3, caracteristica4, descripcion1, descripcion2, descripcion3, descripcion4} = req.body;
        const descripcionArray = descripcion.trim().split("\r\n");

        let features = [];
        let title = "";
        let text = "";
        const caracteristicas = [caracteristica1, descripcion1, caracteristica2, descripcion2, caracteristica3, descripcion3, caracteristica4, descripcion4];
        
        for (let i = 0; i < caracteristicas.length; i += 2 ){
            
            title = caracteristicas[i].trim();
            text = caracteristicas[i+1].trim();

            features.push({title, text});
        }

        //* documentacion: https://github.com/expressjs/multer/blob/master/doc/README-es.md
        let imagesArray = [];

        if(req.files['imagenesExtra']){
            for(let i = 0; i < req.files['imagenesExtra'].length; i++){
                imagesArray.push("/images/products/" + req.files['imagenesExtra'][i].filename)
            }
        }

        const generateId = () =>  {
            let allProducts = JSON.parse(fs.readFileSync(productsJSON, {encoding: 'utf-8'}));
            let lastProduct = allProducts.pop();
            if (lastProduct) {
                return lastProduct.id + 1;
            }
            return 1;
        }

        const descuento = porcentaje == 0 ? false : true; 

        let nuevoProducto = {
            id: generateId(),
            name: nombre,
            image: "/images/products/" + req.files['imagenPrincipal'][0].filename,
            originalPrice: precio,
            category: categoria,
            brand: marca,
            onDiscount: descuento,
            discount: porcentaje,
            mainProduct: esDestacado === 'true',
            extraImages: imagesArray,
            features,
            description: descripcionArray,
        }

        products.push(nuevoProducto);
        
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, ' '));

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
                titulos.push(caracteristicas[i].featureTitle)
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
            
            await db.Product.update( productoEditado )
            
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

            if (newImagenPrincipal != '') {
                await db.Image.update({
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
                        featureTitle: caracteristica1
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
