const mongoose = require('mongoose');
// Para facilitar a digitação
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    
    slug: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("categorias", Categoria);