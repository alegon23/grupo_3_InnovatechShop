const express = require('express')
const path = require('path')

const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');

const PORT = 8080

const app = express()
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto '+PORT);
});

app.use('/', mainRoutes)

app.use('/users', usersRoutes);

app.use('/products', productsRoutes);
