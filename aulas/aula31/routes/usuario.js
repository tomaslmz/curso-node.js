const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

router.get("/registro", (req, res) => {
    res.render('../views/usuario/registro');
});

router.post('/registro', (req, res) => {
    var erros = [];

    //nome, email, senha1, senha2

    if(!req.body.nome || req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Você precisa inserir um nome!'});
    }

    if(!req.body.email || req.body.email == undefined || req.body.email == null) {
        erros.push({texto: 'Você precisa inserir um email válido!'});
    }

    if(!req.body.senha || req.body.senha == undefined || req.body.senha == null) {
        erros.push({texto: 'Você precisa inserir uma senha!'});
    }

    if(!req.body.senha2 || req.body.senha2 == undefined || req.body.senha2 == null) {
        erros.push({texto: 'Você precisa inserir a sua senha de novo!'});
    }

    if(req.body.senha1 != req.body.senha) {
        erros.push({texto: 'As senhas não coincidem!'});
    }

    if(erros.length > 0) {
        res.render('../views/usuario/registro', {erros: erros});
    }
})

module.exports = router