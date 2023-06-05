// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
// const mongoose = require('mongoose');

// Configurações
// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Mongoose

// Rotas

// Outros
const port = 8081;
app.listen(8081, () => {
    console.log("Servidor online!");
});