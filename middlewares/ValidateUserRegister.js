const {User} = require("../models");

module.exports = async (req, res, next) => {
    let {name, cpf, cns, mother_name, birth_date, phone_number, gender, ethnicity, email, password} = req.body;
    const emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!name || !cpf || !cns || !mother_name || !birth_date || !phone_number || !gender || !ethnicity || !email || !password) {
        return res.status(400).json({ erro: "Campo não preenchido!"});

    } else if (!cpfFormatValidate(cpf)) {
        return res.status(400).json({ erro: "CPF inválido!"});

    } else if (name.length < 2 || name.length >= 150) {
        return res.status(400).json({ erro: name.length < 2 ? "Nome curto" : "Nome longo" });

    } else if (mother_name.length < 2 || mother_name.length >= 150) {
        return res.status(400).json({ erro: mother_name.length < 2 ? "Nome da mãe curto" : "Nome da mãe longo" });

    } else if (cns.length != 15) {
        return res.status(400).json({ erro: "CNS inválido!" });

    } else if (!emailValidate.test(email)) {
        return res.status(400).json({ erro: "Email inválido!" });
        
    } else if (!phoneNumberValidator(phone_number)) {
        return res.status(400).json({ erro: "Telefone inválido!" });
        
    } else if (password.length < 8 || password.length > 15) {
        return res.status(400).json({ erro: "Senha deve ser entre 8 e 15 caracteres." });
        
    } else {
        next();
    }
}

const cpfFormatValidate = strCPF => {
    let sum = 0, rest;
    
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(strCPF.substring(9, 10)) ) return false;

    sum = 0;
    for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
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