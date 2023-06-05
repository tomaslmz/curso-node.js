// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// const mongoose = require('mongoose');

// Configurações
// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Mongoose

// Public
app.use(express.static(path.join(__dirname, 'public')));


// Rotas
const mainRoute = require('./routes/main');
app.use('/', mainRoute);

const admRoute = require('./routes/admin');
app.use('/adm', admRoute)
// Outros
const port = 8081;
app.listen(8081, () => {
    console.log("Servidor online!");
});