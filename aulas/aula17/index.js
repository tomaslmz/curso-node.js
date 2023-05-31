const express = require("express");
const app = express();

const handlebars = require("express-handlebars");

const Sequelize = require('sequelize');



//configuração do handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//Conexão com o bando de dados MySQL
const sequelize = new Sequelize('teste', 'root', 'root', {
    host: "localhost",
    dialect: "mysql",
});

app.get('/cadastro', (req, res) => {
    res.render('formulario');
})

app.listen(8081, () => {
    console.log("Servidor rodando");
});