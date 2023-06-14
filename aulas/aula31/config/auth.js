const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario) {
                return done(null, false, {message: 'Esta conta não existe!'});
            }

            bcrypt.compare(senha, usuario.senha, (err, ok) => {
                if(ok) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Senha incorreta!'});
                }
            });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, usuario.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}