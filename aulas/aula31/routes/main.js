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

module.exports = Router;