const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, world!");
})

app.get("/sobre", (req, res) => {
    res.send("Minha página sobre: ");
})

app.get("/blog", (req, res) => {
    res.send("Bem-vindo ao meu blog!");
})
//localhost:8081
app.listen(8081, () => {//Esse comando tem que ser sempre o último.
    console.log("servidor rodando em localhost:8081");
});