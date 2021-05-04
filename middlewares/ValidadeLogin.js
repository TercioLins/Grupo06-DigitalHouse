module.exports = (req, res, next) => {
    if (req.session.usuarioLogado != null)
        next();
    else
        res.redirect("/users/login");
}