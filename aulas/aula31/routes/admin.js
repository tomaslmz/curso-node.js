const express = require('express');
const router = express.Router();

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

module.exports = router;