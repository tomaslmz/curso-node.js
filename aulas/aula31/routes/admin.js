const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

router.get('/', (req, res) => {
    res.render('../pages/admin/home');
})

router.get("/posts", (req, res) => {
    res.send("Página de posts");
});

router.get('/categorias', (req, res) => {
    res.render("../pages/admin/categorias");
});

router.get("/categorias/cadastrar", (req, res) => {
    res.render('../pages/admin/add-categorias');
});

router.post("/categorias/novo", (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    };

    new Categoria(novaCategoria).save().then(() => {
        console.log("Nova categoria registrada com sucesso!");
    }).catch((err) => {
        console.log("Falha no registro da categoria: " + err);
    });
});

module.exports = router;