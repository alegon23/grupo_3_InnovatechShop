const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware')

const PORT = process.env.PORT || 3001;

const app = express()
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'InnovaTechShop', saveUninitialized: true, resave: false}));
app.use(cookies())
app.use(userLoggedMiddleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto '+PORT);
});

app.use('/', mainRoutes)

app.use('/users', usersRoutes);

app.use('/products', productsRoutes);
