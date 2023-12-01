const calcularDescuento = require('../data/calcularDescuento');
const path = require('path');
const fs = require('fs');
const productsJSON = path.join(__dirname, '../data/products.json');;
const products = require('../data/products');
const calcularMiles = require('../data/calcularMiles');

const productsController = {
    listado: (req, res) =>{
        const titulo = "Todos los Productos";
        res.render(path.resolve('./', './src/views/main/results'), {titulo, resultados: products, calcularMiles});
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
        let { nombre, marca, categoria, precio, descripcion, caracteristicas } = req.body;

        //! aqui podemos cambiar la forma en la que se suban los datos
        const descripcionArray = descripcion.trim().split("\r\n");

        let description = [];
        let title = "";
        let text = "";

        for (let i = 0; i < descripcionArray.length; i += 2 ){
            const elemArray1 = descripcionArray[i].split(':');
            if(elemArray1[0].toLowerCase() === 'titulo'){
                title = elemArray1[1].trim();
            }

            const elemArray2 = descripcionArray[i+1].split(':');

            if(elemArray2[0].toLowerCase() === 'texto'){
                text = elemArray2[1].trim();
            }

            description.push({title, text});
        }

        //! aqui podemos cambiar la forma en la que se suban los datos
        const caracteristicasArray = caracteristicas.trim().split("\r\n");

        let features = [];
        title = "";
        text = "";

        for (let i = 0; i < caracteristicasArray.length; i += 2 ){
            const elemArray1 = caracteristicasArray[i].split(':');
            if(elemArray1[0].toLowerCase() === 'titulo'){
                title = elemArray1[1].trim();
            }

            const elemArray2 = caracteristicasArray[i+1].split(':');

            if(elemArray2[0].toLowerCase() === 'texto'){
                text = elemArray2[1].trim();
            }

            features.push({title, text});
        }

        //! documentacion:
        // https://github.com/expressjs/multer/blob/master/doc/README-es.md
        let imagesArray = [];

        if(req.files['imagenes-extra']){
            for(let i = 0; i < req.files['imagenes-extra'].length; i++){
                imagesArray.push("/images/products/" + req.files['imagenes-extra'][i].filename)
            }
        }

        let nuevoProducto = {
            id: products.length + 1,
            name: nombre,
            image: "/images/products/" + req.files['imagen-principal'][0].filename,
            originalPrice: precio,
            category: categoria,
            brand: marca,
            onDiscount: false,
            discount: "0",
            extraImages: imagesArray,
            features,
            description,
        }

        products.push(nuevoProducto);
        
        fs.writeFileSync(productsJSON, JSON.stringify(products));

        res.redirect('/products');
    },

    editar: (req, res) =>{
        const productID = products.find(producto => producto.id == req.params.id);
        res.render(path.resolve('./', './src/views/products/editarProducto'), {productID})
    },
    
}

module.exports = productsController;