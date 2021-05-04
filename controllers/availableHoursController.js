const {AvailableHour, sequelize} = require('../models');
const moment = require("moment");

const availableHoursController = {
    index: async (req, res) => {
        let availableHours = await AvailableHour.findAll();
        let data = params => {
            return moment(params).locale("pt-br").format("L");
        }
        let semana = params => {
            return moment(params).locale("pt-br").format("dddd").toUpperCase();
        }
        return res.render("schedule", {availableHours, data, semana});
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { available } = req.body;
            let availableHour = await AvailableHour.update({
                available
            }, {
                where: {id}
            });
            return res.status(200).json(availableHour);
            
        } catch(error) {
            return res.status(400).json("Horário não existe.");
        }
    }
}


module.exports = availableHoursController;