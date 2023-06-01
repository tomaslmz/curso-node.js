const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste', 'root', 'root', {
    host: "localhost",
    dialect: "mysql",
});

const postagens = sequelize.define('postagens', {//Criação 
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

const usuarios = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

postagens.create({
    titulo: "Título de postagem",
    conteudo: "lorem"
})

usuarios.create({
    nome: "Tomás",
    sobrenome: "Mendoza",
    idade: 18,
    email: "tomas153@gmail.com"
})

// postagens.sync({force: true});
// usuarios.sync({force: true});

// sequelize.authenticate().then(() => {
//     console.log("Conectado com sucesso!");
// }).catch((erro) => {
//     console.log("Falha ao se conectar: ERRO " + erro);
// });