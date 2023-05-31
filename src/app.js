const express = require('express');
const morgan = require('morgan');
const createRoles = require('./libs/createRoles');
//importacion de rutas
const rutasProductos = require('./routes/productos.js');
const rutasAuth = require('./routes/auth.routes.js');

const port = 3000;
const app = express();
createRoles();
//app middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//configuracion rutas
app.use('/productos', rutasProductos);
app.use('/auth', rutasAuth);

app.listen(port, () => console.log(`App corriendo en el puesrto ${port}`)); 