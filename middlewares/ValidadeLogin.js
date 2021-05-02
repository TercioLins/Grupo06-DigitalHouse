const { User } = require("../models");

module.exports = async (req, res, next) => {
    let { email, password } = req.body;
    const emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!email || !password) {
        return res.status(400).json({ error: "Campo não preenchido!" });

    }  else if (!emailValidate.test(email)) {
        return res.status(400).json({ error: "Email inválido!" });

    } else 
        next();
}