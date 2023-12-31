const calcularDescuento = require('../public/js/calcularDescuento');
const path = require('path');
const fs = require('fs');
const productsJSON = path.join(__dirname, '../data/products.json');
let products = require('../data/products');
const calcularMiles = require('../public/js/calcularMiles');
const { validationResult } = require("express-validator");

const productsController = {
    listado: (req, res) =>{
        const titulo = "Todos los Productos";
        res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: products, calcularMiles});
    },

    listadoCelulares: (req, res) =>{
        const titulo = "Celulares";
        const resultados = products.filter(producto => producto.category == 'Celulares');
        res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados, calcularMiles});
    },

    listadoMonitoresTVs: (req, res) =>{
        const titulo = "Monitores & TVs";
        const resultados = products.filter(producto => producto.category == 'Monitores & TVs');
        res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados, calcularMiles});
    },

    listadoTablets: (req, res) =>{
        const titulo = "Tablets";
        const resultados = products.filter(producto => producto.category == 'Tablets');
        res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados, calcularMiles});
    },

    listadoNotebooks: (req, res) =>{
        const titulo = "Notebooks";
        const resultados = products.filter(producto => producto.category == 'Notebooks');
        res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados, calcularMiles});
    },

    listadoHardware: (req, res) =>{
        const titulo = "Hardware";
        const resultados = products.filter(producto => producto.category == 'Hardware');
        res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados, calcularMiles});
    },

    listadoAccesorios: (req, res) =>{
        const titulo = "Accesorios";
        const resultados = products.filter(producto => producto.category == 'Accesorios');
        res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados, calcularMiles});
    },

    carrito: (req, res) =>{
        res.render(path.resolve('./', './src/views/products/carrito'));
    },

    detalle: (req, res) =>{
        const productID = products.find(producto => producto.id == req.params.id);
        res.render(path.resolve('./', './src/views/products/detalleProducto'), {productID, calcularDescuento, calcularMiles})
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

        if(req.files['imagenes-extra']){
            for(let i = 0; i < req.files['imagenes-extra'].length; i++){
                imagesArray.push("/images/products/" + req.files['imagenes-extra'][i].filename)
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
            image: "/images/products/" + req.files['imagen-principal'][0].filename,
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

    editar: (req, res) => {
        const productID = products.find(producto => producto.id == req.params.id);
        res.render(path.resolve('./', './src/views/products/editarProducto'), {productID})
    },

    actualizar: (req, res) => {
        const productID = products.find(producto => producto.id == req.params.id);
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/products/editarProducto'), {errors: errors.mapped(), oldData: req.body, productID});
        }

        let idProd = req.params.id;
        let { nombre, marca, categoria, precio, descripcion, porcentaje, esDestacado, caracteristica1, caracteristica2, caracteristica3, caracteristica4, descripcion1, descripcion2, descripcion3, descripcion4 } = req.body;
        let indexProducto = products.findIndex(prod => prod.id == idProd);
        const descuento = porcentaje == 0 ? false : true;
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

        //se pregunta si se recibieron imagenes preguntando si el objeto tiene alguna key. Si tiene, se recibieron imagenes, sino no
        let newImagenPrincipal = "";
        let imagesArray = [];
        if(Object.keys(req.files).length){
            if (req.files['imagen-principal']){
                newImagenPrincipal = "/images/products/" + req.files['imagen-principal'][0].filename;
            }
        
            if (req.files['imagenes-extra']){
                for(let i = 0; i < req.files['imagenes-extra'].length; i++){
                    imagesArray.push("/images/products/" + req.files['imagenes-extra'][i].filename)
                }
            }
        }

        if (indexProducto != -1){
            products[indexProducto].name = nombre;
            if (newImagenPrincipal) {
                products[indexProducto].image = newImagenPrincipal;
            }
            products[indexProducto].originalPrice = precio;
            products[indexProducto].category = categoria;
            products[indexProducto].brand = marca;
            products[indexProducto].onDiscount = descuento;
            products[indexProducto].discount = porcentaje;
            products[indexProducto].mainProduct = esDestacado == 'true';
            if (imagesArray.length) {
                products[indexProducto].extraImages = imagesArray;
            }
            products[indexProducto].features = features;
            products[indexProducto].description = descripcionArray;

            fs.writeFileSync(productsJSON, JSON.stringify(products, null, ' '));
            
            res.redirect('/products');
        } else {
            res.send('Producto no encontrado');
        }
    },
    
    borrar: (req, res) => {
        const idProd = req.params.id;
        products = products.filter(prod => prod.id != idProd);
        
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, ' '));
        
        res.redirect('/products');
    }
}

module.exports = productsController;