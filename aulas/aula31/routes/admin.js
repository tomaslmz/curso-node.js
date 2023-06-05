const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Página principal do painel ADM");
})

router.get("/posts", (req, res) => {
    res.send("Página de posts");
});

router.get("/cadastrar-categorias", (req, res) => {
    res.send("Página de cadastro de categorias");
});

module.exports = router;