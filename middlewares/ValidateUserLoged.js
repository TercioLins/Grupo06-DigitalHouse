module.exports = (req, res, next) => {
    if (req.session.usuarioLogado != null)
        res.redirect("/users/userprofile");    
    else
        next();
}