const {User} = require("../models");

module.exports = async (req, res, next) => {
    try {
        const {id} = req.session.usuarioLogado;
        const isAdmin = await User.findOne({
            where: {id, is_admin: true}
        });
        
        if (isAdmin)
            next();
    
        else
            res.redirect("/");        
    } catch (error) {
        res.redirect("/");
    }
}