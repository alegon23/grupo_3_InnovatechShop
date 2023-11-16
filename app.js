const express = require('express')
const path = require('path')
const PORT = 8080

const app = express()
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto '+PORT);
});

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/index.html'))
});

app.get('/login', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/login.html'))
});

app.get('/registro', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/registro.html'))
});

app.get('/carrito', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/carrito.html'))
});

app.get('/detalleProducto', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/detalleProducto.html'))
});

app.get('/crearProducto', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/crearProducto.html'))
});
