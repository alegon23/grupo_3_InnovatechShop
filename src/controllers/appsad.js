actualizar: (req, res) => {
        /*let idProd = req.params.id;
        let { nombre, marca, categoria, precio, descripcion, caracteristicas, porcentaje } = req.body;
        let indexProducto = products.findIndex(prod => prod.id == idProd);
        const descuento = porcentaje == 0? false:true;*/
        console.log(req.body);
        
        /*if (indexProducto != -1){
            products[indexProducto].name = nombre;
            products[indexProducto].originalPrice = precio;
            products[indexProducto].category = categoria;
            products[indexProducto].brand = marca;
            products[indexProducto].onDiscount = descuento;
            products[indexProducto].discount = porcentaje;
            products[indexProducto].features = caracteristicas;
            products[indexProducto].description = descripcion;

            fs.writeFileSync(productsJSON, JSON.stringify(products));
            
            res.redirect('/products');
        } else {
            console.log('no se encontro el producto');
            res.send('Producto no encontrado');
        }*/
    }