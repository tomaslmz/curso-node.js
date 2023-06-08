const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

router.get('/', (req, res) => {
    res.render('../views/admin/home');
})

router.get("/posts", (req, res) => {
    res.send("Página de posts");
});

router.get('/categorias', (req, res) => {
    Categoria.find().lean().sort({date: 'desc'}).then((categorias) => {
        res.render("../views/admin/categorias", {categorias: categorias});
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao carregar as categorias!');
        res.redirect('/admin')
    })
});

router.get("/categorias/cadastrar", (req, res) => {
    res.render('../views/admin/add-categorias');
});

router.post("/categorias/novo", (req, res) => {

    var erros = [];


    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido!"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: "Slug inválido!"})
    }

    if(req.body.nome.lenght < 5) {
        erros.push({texto: "Nome da categoria muito pequeno!"});
    }

    if(req.body.slug != req.body.slug.toLowerCase()) {
        erros.push({texto: "O Slug não pode conter letras maiúsculas"});
    }

    if(erros.length > 0) {
        res.render("../views/admin/add-categorias", {erros: erros});
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        };
    
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!");
            res.redirect("/adm/categorias");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!");
            res.redirect('/adm');
        });
    }
});

module.exports = router;