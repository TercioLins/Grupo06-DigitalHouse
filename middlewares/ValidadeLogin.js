const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        const emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!email || !password) {
            return res.status(400).json({ error: "Campo não preenchido!" });

        } else if (!isNaN(email)) {
            return res.status(400).json({ error: "Email inválido!" });

        } else if (!emailValidate.test(email)) {
            return res.status(400).json({ error: "Email inválido!" });

        } else if (password.length < 8 || password.length > 15) {
            return res.status(400).json({ error: "Email ou senha errado rsrs!" });

        } else 
            next();
    } catch {
        res.status(401).json({
            error: new Error("Invalid Request!")
        });
    }
}