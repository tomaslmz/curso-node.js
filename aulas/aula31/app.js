// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Configurações
// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Mongoose
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/blog", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
}).catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err);
});
// Public
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log("Olá, eu sou um middleware!");
    next();
});


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