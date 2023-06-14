const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcrypt = require('bcryptjs');
const passport = require('passport');

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

    if(req.body.senha2 != req.body.senha) {
        erros.push({texto: 'As senhas não coincidem!'});
    }

    if(erros.length > 0) {
        res.render('../views/usuario/registro', {erros: erros});
    } else {
        Usuario.findOne({email: req.body.email}).lean().then((usuario) => {
            if(usuario) {
                req.flash('error_msg', 'Este e-mail já está cadastrado!');
                res.redirect('/usuario/registro');
            } else {

                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                });

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro) {
                            req.flash("error_msg", 'Houve um erro ao armazenar o dado do usuário!');
                            res.redirect('/');
                        } 

                        novoUsuario.senha = hash;

                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Registro realizado com sucesso!");
                            res.redirect('/');
                        }).catch((err) => {
                            req.flash("error_msg", 'Houve um erro ao criar o usuário!');
                            res.redirect('/');
                        })
                    });
                });

                
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno!');
        })
    }
})

router.get('/login', (req, res) => {
    res.render('../views/usuario/login')
});

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/usuario/login',
        failureFlash: true
    })(req, res, next);
})

module.exports = router