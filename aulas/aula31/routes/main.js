const express = require('express');
const Router = express.Router();
const mongoose = require("mongoose");
require('../models/Postagem');
const Postagem = mongoose.model("postagens");

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

module.exports = Router;