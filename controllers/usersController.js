const bcrypt = require('bcryptjs');
const { User, sequelize } = require("../models");

const usersController = {
    index: async (req, res) => {
        let user = await User.findAll();
        return res.status(200).json(user);
    },

    create: async (req, res) => {
        try {
            let {
                name,
                cpf,
                cns,
                mother_name,
                birth_date,
                phone_number,
                gender,
                ethnicity,
                email,
                password,
                address_id,
            } = req.body;
    
            const senhaCrypt = bcrypt.hashSync(password, 10);
    
            let user = await User.create({
                name,
                cpf,
                cns,
                mother_name,
                birth_date,
                phone_number,
                gender,
                ethnicity,
                email,
                password: senhaCrypt,
                address_id,
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    update: async (req, res) => {
        try {
            let { id } = req.params;
            let { name, phone_number, gender, email, password } = req.body;
    
            let user = await User.update(
                {
                    name,
                    phone_number,
                    gender,
                    email,
                    password,
                }, {
                    where: { id },
                }
            );
            return res.status(200).json(user);

        } catch(error) {
            return res.status(400).json("CPF não encontrado.");
        } 
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await User.destroy({
                where: { id },
            });
            return res.status(200).json("Deletado com sucesso.");

        } catch(error) {
            return res.status(200).json("CPF não registrado!");
        }
    },

    find: async (req, res) => {
        try {
            let { id } = req.params;
            let user = await User.findOne({
                where: { id },
            });
            return res.status(200).json(user);

        } catch(error) {
            return res.status(400).json("Usuario nao encontrado.");
        }
    },

    login: async (req, res) => {
        try {
            let {email , password} = req.body; 
            
            let user = await User.findOne({
                where: { email },
            });

            let pCheck = bcrypt.compareSync(password, user.password);

            return (user.email === email && pCheck) ? res.status(200).json({message: "Ok"}) : res.status(401).json({error: "Login invalido!" });
            
        } catch {
            return res.status(401).json({
                error: new Error("Invalid Request!")
            });
        }
    }
};

module.exports = usersController;
