const {User} = require("../models");

module.exports = async (req, res, next) => {
    let {id} = req.params;
    let {phone_number, email, password} = req.body;
    let users = await User.findOne({ where: {id} });
    const emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (users.email !== email) {
        if (!emailValidate.test(email))
            return res.status(400).json({ erro: "Email inválido!" });
    }

    if (users.phone_number !== phone_number) {
        if (!phoneNumberValidator(phone_number))
            return res.status(400).json({ erro: "Telefone inválido!" });
    }

    if (users.password !== password) {
        if (password.length < 8 || password.length > 15) 
            return res.status(400).json({ erro: "Senha deve ser entre 8 e 15 caracteres." });
    }
    
    next();
}

const phoneNumberValidator = telefone => {
    telefone = telefone.replace(/\D/g, '');

    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

    for (var n = 0; n < 10; n++) {
        if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
    }
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    return true;
}