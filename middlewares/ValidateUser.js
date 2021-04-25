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