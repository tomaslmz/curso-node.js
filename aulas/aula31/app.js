// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require('connect-flash');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('./config/auth')(passport);

// Configurações
// Configurar a nossa sessão
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Configurar o middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next(); 
})
// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format("DD/MM/YYYY");
        }
    }
}));
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
// Rotas
const mainRoute = require('./routes/main');
app.use('/', mainRoute);

const admRoute = require('./routes/admin');
app.use('/adm', admRoute)

const userRoute = require('./routes/usuario');
app.use('/usuario', userRoute);
// Outros
const port = 8081;
app.listen(port, () => {
    console.log("Servidor online!");
});