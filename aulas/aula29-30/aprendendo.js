//Conectando ao MongoDB
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/learningmongodb", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected!");
}).catch((erro) => {
    console.log("There is an error: " + erro);
});

//Model Usuários

//Definindo o Model

const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    
    sobrenome: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    idade: {
        type: Number,
        require: true
    },

    pais: {
        type: String
    }
});

//Definindo a collection

mongoose.model('Users', UserSchema);

//Inserindo dados

const User = mongoose.model('Users');

new User ({
    nome: "Tomás",
    sobrenome: "Teste",
    email: "tomas@gmail.com",
    idade: 18,
    pais: "Brazil"
}).save().then(() => {
    console.log("User information saved!");
}).catch((erro) => {
    console.log("User information not saved: " + erro);
});
