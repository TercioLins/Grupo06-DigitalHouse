const { Address, sequelize } = require("../models");

const addressesController = {
    index: async (req, res) => {
        let addresses = await Address.findAll();
        return res.status(200).json(addresses);
    },

    create: async (req, res) => {
        try {
            let {
                address,
                number,
                complement,
                zip_code,
                neighborhood,
                city,
                state,
            } = req.body;
    
            let newAddress = await Address.create({
                address,
                number,
                complement,
                zip_code,
                neighborhood,
                city,
                state,
            });
            return res.status(200).json(newAddress);
            
        } catch(error) {
            return res.status(400).json("Endereço já registrado.");
        }
        
    },

    update: async (req, res) => {
        try {
            let { id } = req.params;
            let {
                address,
                number,
                complement,
                zip_code,
                neighborhood,
                city,
                state,
            } = req.body;
    
            let addressUpdated = await Address.update(
                {
                    address,
                    number,
                    complement,
                    zip_code,
                    neighborhood,
                    city,
                    state,
                }, {
                    where: { id },
                }
            );
            return res.status(200).json(addressUpdated);

        } catch(error){
            res.status(400).json("Endereço não encontrado.");
        }
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