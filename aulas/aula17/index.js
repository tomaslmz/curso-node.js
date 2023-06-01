const express = require("express");
const app = express();

const handlebars = require("express-handlebars");

const bodyParser = require("body-parser");

const Post = require("./models/Post");





//configuração do handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', 
    runtimeOptions: {//Necessária essa configuração pra permitir que os dados do MySQL sejam acessados e mostrados.
        allowProtoPropertiesByDefault: true,

        allowProtoMethodsByDefault: true,
}}));

app.set('view engine', 'handlebars');
//configuração do body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Conexão com o bando de dados MySQL

app.get('/', (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        res.render('home', {posts: posts});
    })
});

app.get('/postar', (req, res) => {
    res.render('formulario');
});

app.post('/add', (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(() => {
        res.redirect('/');
    }).catch((erro) => {
        res.send("Houve um erro: " + erro);
    });
});

app.get('/deletar/:id', (req, res) => {
    Post.destroy({where: {'id' : req.params.id}}).then(() => {
        res.redirect('/');
    }). catch((erro) => {
        res.send('Essa postagem não existe! ERRO: ' + erro);
    });
});

app.listen(8081, () => {
    console.log("Servidor rodando");
});