var http = require('http');

http.createServer((req, res) => {
    res.end("Hello, world! Welcome to my website!");
}).listen(8081);

console.log("Servidor está aberto rodando!");