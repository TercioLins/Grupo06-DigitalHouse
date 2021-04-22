const { Address, sequelize } = require("../models");

/*    GET users listing.   */

const addressesController = {
    index: async (request, response) => {
        let addresses = await Address.findAll();

        return response.status(200).json(addresses);
    },

    create: async (request, response) => {
        let {
            address,
            number,
            complement,
            zip_code,
            neighborhood,
            city,
            state,
        } = request.body;

        let newAddress = await Address.create({
            address,

            number,

            complement,

            zip_code,

            neighborhood,

            city,

            state,
        });

        return response.json(newAddress);
    },

    update: async (request, response) => {
        let { id } = request.params;

        let {
            address,
            number,
            complement,
            zip_code,
            neighborhood,
            city,
            state,
        } = request.body;

        let addressUpdated = await Address.update(
            {
                address,

                number,

                complement,

                zip_code,

                neighborhood,

                city,

                state,
            },
            {
                where: { id },
            }
        );

        //retorno

        return response.send(addressUpdated);
    },

    delete: async (req, res) => {
        const address = req.params;

        await Address.destroy({
            where: {
                id: address.id,
            },
        });

        return res.send("Endereço deletado com sucesso!");
    },

    show: async (req, res) => {
        let { id } = req.params;

        let address = await Address.findAll({
            where: { id },
        });

        return res.json(address);
    },
};

module.exports = addressesController;
