require('dotenv').config();
const express = require('express')
const cors = require('cors')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersApiRoutes = require('./routes/api/usersApiRoutes')
const productsApiRoutes = require('./routes/api/productsApiRoutes')
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
app.use(cors(["localhost:8080"]));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto '+PORT);
});

//rutas
app.use('/', mainRoutes)
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

//rutas api
app.use('/api/users', usersApiRoutes);
app.use('/api/products', productsApiRoutes);


app.use((req,res,next) => {
    res.status(404).render(path.resolve('./', './src/views/main/error'), {mensaje: "Error 404"})
})
