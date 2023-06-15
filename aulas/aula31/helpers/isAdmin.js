module.exports = {
    isAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.isAdmin == true) {
            return next();
        }

        req.flash("error_msg", "Você precisa ser um administrador para acessar esta rota!");
        res.redirect("/");
    }
}