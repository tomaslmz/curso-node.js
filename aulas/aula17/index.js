const express = require("express");
const app = express();

const handlebars = require("express-handlebars");

const bodyParser = require("body-parser");





//configuração do handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//configuração do body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Conexão com o bando de dados MySQL


app.get('/cadastro', (req, res) => {
    res.render('formulario');
})

app.post('/add', (req, res) => {
    res.send("Título: " + req.body.titulo + "<br>Conteúdo: " + req.body.conteudo);
})

app.listen(8081, () => {
    console.log("Servidor rodando");
});