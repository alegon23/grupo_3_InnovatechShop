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
        let { nombre, marca, categoria, precio, descripcion, caracteristicas, porcentaje } = req.body;

        //! aqui podemos cambiar la forma en la que se suban los datos
        const descripcionArray = descripcion.trim().split("\r\n");
        let description = [];
        let title = "";
        let text = "";

        for (let i = 0; i < descripcionArray.length; i += 2 ){
            
            title = descripcionArray[i].trim();
            text = descripcionArray[i+1].trim();

            description.push({title, text});
        }

        //! aqui podemos cambiar la forma en la que se suban los datos
        console.log(req.body);
        let features = [];
        title = "";
        text = "";
        
        for (let i = 0; i < caracteristicas.length; i += 2 ){
            
            title = caracteristicas[i].trim();
            text = caracteristicas[i+1].trim();

            features.push({title, text});
        }
        console.log(features);
        //! documentacion:
        // https://github.com/expressjs/multer/blob/master/doc/README-es.md
        let imagesArray = [];

        if(req.files['imagenes-extra']){
            for(let i = 0; i < req.files['imagenes-extra'].length; i++){
                imagesArray.push("/images/products/" + req.files['imagenes-extra'][i].filename)
            }
        }

        const descuento = porcentaje == 0? false:true; 

        let nuevoProducto = {
            id: products.length + 1,
            name: nombre,
            image: "/images/products/" + req.files['imagen-principal'][0].filename,
            originalPrice: precio,
            category: categoria,
            brand: marca,
            onDiscount: descuento,
            discount: porcentaje,
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