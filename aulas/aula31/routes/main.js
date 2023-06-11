const express = require('express');
const Router = express.Router();
const mongoose = require("mongoose");
require('../models/Postagem');
const Postagem = mongoose.model("postagens");
require('../models/Categoria');
const Categoria = mongoose.model("categorias");

Router.get('/', (req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("../views/index", {postagens: postagens});
    }).catch((err) => {
        req.flash("error_msg", "Não foi possível carregar as postagens");
    });
});

Router.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({slug: req.params.slug}).lean().populate("categoria").then((postagem) => {
        if(postagem) {
            res.render("../views/postagem", {postagem: postagem});
        } else {
            req.flash("error_msg", "Essa postagem não existe!");
            res.redirect("/");
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno!");
        res.redirect("/");
    })
})

Router.get("/categorias", (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('../views/categorias', {categorias: categorias});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao mostrar as categorias!");
        res.redirect("/");
    });
});

Router.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
        if(categoria) {
            Postagem.find({categoria: categoria._id}).populate("categoria").lean().then((postagens) => {
                res.render("../views/filtro", {postagens: postagens});
            });
        } else {
            req.flash("error_msg", "Essa categoria não existe!");
            res.redirect("/categorias");
        }
    })
});

module.exports = Router;