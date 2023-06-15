const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");
require("../models/Postagem");
const Postagem = mongoose.model("postagens");
const {isAdmin} = require("../helpers/isAdmin");

router.get('/', isAdmin ,(req, res) => {
    res.render('../views/admin/home');
})

router.get("/posts", isAdmin ,(req, res) => {
    res.send("Página de posts");
});

router.get('/categorias', isAdmin ,(req, res) => {
    Categoria.find().lean().sort({date: 'desc'}).then((categorias) => {
        res.render("../views/admin/categorias", {categorias: categorias});
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao carregar as categorias!');
        res.redirect('/admin')
    })
});

router.get("/categorias/cadastrar", isAdmin ,(req, res) => {
    res.render('../views/admin/add-categorias');
});

router.post("/categorias/novo", isAdmin ,(req, res) => {

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

    req.body.slug = req.body.slug.replace(" ", "-");

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

router.get("/categorias/editar/:id", isAdmin ,(req, res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render("../views/admin/editar-categoria", {categoria: categoria});
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe");
        res.redirect("/adm/categorias");
    });
    
});

router.post("/categorias/edit", isAdmin ,(req, res) => {
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
        res.render("../views/admin/editar-categoria", {erros: erros});
    } else {
        Categoria.findOne({_id : req.body.id}).then((categoria) => {
            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;

            categoria.save().then(() => {
                req.flash("success_msg", "Categoria editada com sucesso!");
                res.redirect("/adm/categorias");
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao salvar a edição da categoria!");
                res.redirect("/adm/categorias");
            });
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao editar a categoria, tente novamente!");
            res.redirect("/adm/categorias");
        });
    }
});

router.get("/categorias/apagar/:id", isAdmin ,(req, res) => {
    Categoria.findOne({_id : req.params.id}).then((categoria) => {
        let nome = categoria.nome;

        Categoria.deleteOne({_id: req.params.id}).then(() => {
            req.flash("success_msg", "A categoria " + nome + " foi deletada!");
            res.redirect("/adm/categorias");
        }).catch((err) => {
            req.flash("error_msg", "A categoria não pode ser apagada!");
            res.redirect("/adm/categorias");
        })
    });
});

router.get("/postagens", isAdmin ,(req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: 'desc'}).then((postagens) => {
        res.render("../views/admin/postagens", {postagens: postagens});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens!" );
        res.redirect("/adm");
    })
})

router.get("/postagem/criar", isAdmin ,(req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("../views/admin/add-postagem", {categorias: categorias});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário!");
        res.redirect("/adm");
    });
})

router.post("/postagem/postar", isAdmin ,(req, res) => {
    var erros = [];

    if(!req.body.titulo || req.body.titulo === undefined || req.body.titulo == null) {
        erros.push({texto: "Título não pode ser vazio!"});
    }

    if(!req.body.slug || req.body.slug === undefined || req.body.slug == null) {
        erros.push({texto: "Slug não pode ser vazio!"});
    } 

    if(!req.body.descricao || req.body.descricao === undefined || req.body.descricao == null) {
        erros.push({texto: "Descrição não pode ser vazio!"});
    }

    if(!req.body.conteudo || req.body.conteudo === undefined || req.body.conteudo == null) {
        erros.push({texto: "Conteúdo não pode ser vazio!"});
    }

    if(req.body.categoria == "0") {
        erros.push({texto: "É necessário inserir alguma categoria!"});
    }

    if(erros.length > 0) {
        res.render('../views/admin/add-postagem', {erros: erros});
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!");
            res.redirect("/adm/postagens");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao criar sua postagem, tente novamente!");
            res.redirect("/adm/postagens");
        });
    }
});

router.get("/postagem/editar/:id", isAdmin ,(req, res) => {
    Categoria.find().lean().then((categorias) => {
        Postagem.findOne({_id: req.params.id}).lean().then((postagem) => {
            res.render("../views/admin/editar-postagem", {postagem: postagem, categorias: categorias});
        }).catch(() => {
            req.flash("error_msg", "Essa postagem não existe!");
            res.redirect("/adm/postagens");
        });
    }).catch((err) => {
        req.flash("error_msg", "Erro ao listar as categorias na edição de postagem!");
        res.redirect("adm/postagens");
    });
});

router.post("/postagem/edit", isAdmin ,(req, res) => {
    var erros = [];

    if(!req.body.titulo || req.body.titulo === undefined || req.body.titulo == null) {
        erros.push({texto: "Título não pode ser vazio!"});
    }

    if(!req.body.slug || req.body.slug === undefined || req.body.slug == null) {
        erros.push({texto: "Slug não pode ser vazio!"});
    } 

    if(!req.body.descricao || req.body.descricao === undefined || req.body.descricao == null) {
        erros.push({texto: "Descrição não pode ser vazio!"});
    }

    if(!req.body.conteudo || req.body.conteudo === undefined || req.body.conteudo == null) {
        erros.push({texto: "Conteúdo não pode ser vazio!"});
    }

    if(req.body.categoria == "0") {
        erros.push({texto: "É necessário inserir alguma categoria!"});
    }

    if(erros.length > 0) {
        res.render('../views/admin/postagens', {erros: erros});
    } else {
        Postagem.findOne({_id: req.body.id}).then((postagem) => {
            postagem.titulo = req.body.titulo;
            postagem.slug = req.body.slug;
            postagem.descricao = req.body.descricao;
            postagem.conteudo = req.body.conteudo;
            postagem.categoria = req.body.categoria;

            postagem.save().then(() => {
                req.flash("success_msg", "Postagem editada com sucesso!");
                res.redirect("/adm/postagens");
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao editar a postagem! " + err);
                res.redirect("/adm/postagens");
            })
        }).catch((err) => {
            req.flash("error_msg", "Essa postagem não existe!");
        })
    }
});

router.get("/postagem/apagar/:id", isAdmin ,(req, res) => {
    Postagem.findOne({_id: req.params.id}).then((postagem) => {
        let nome = postagem.titulo;

        Postagem.deleteOne({_id: req.params.id}).then(() => {
            req.flash("success_msg", "A postagem " + nome + " foi deletada!");
            res.redirect("/adm/postagens");
        }).catch((err) => {
            req.flash("error_msg", "A postagem não pode ser apagada!");
            res.redirect("/adm/postagens");
        })
    })
})

module.exports = router;