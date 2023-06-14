const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario) {
                return done(null, false, {message: 'Esta conta não existe!'});
            }

            bcrypt.compare(senha, usuario.senha, (err, ok) => {
                if(ok) {
                    return done(null, usuario);
                } else {
                    return done(null, false, {message: 'Senha incorreta!'});
                }
            });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id).then((usuario) => {
            done(null, usuario);
        }).catch((err) => {
            done(null, false, {message: 'Algo deu errado!'});
        })
    })
}