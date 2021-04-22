const { User, sequelize } = require("../models");

const usersController = {
    index: async (req, res) => {
        let user = await User.findAll();
        return res.status(200).json(user);
    },

    create: async (req, res) => {
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
            password,
            address_id,
        });
        return res.status(200).json(user);
    },

    update: async (req, res) => {
        let { id } = req.params;
        let { name, phone_number, gender, email, password } = req.body;

        let user = await User.update(
            {
                name,
                phone_number,
                gender,
                email,
                password,
            },
            {
                where: { id },
            }
        );

        return res.status(200).json(user);
    },

    delete: async (req, res) => {
        const { id } = req.params;
        await User.destroy({
            where: { id },
        });

        return res.status(200).send("Deletado com sucesso.");
    },

    find: async (req, res) => {
        let { id } = req.params;
        let user = await User.findAll({
            where: { id },
        });

        return res.status(200).json(user);
    },
};

module.exports = usersController;
