const { AvailableHour, Schedule, sequelize } = require('../models');
const moment = require("moment");

const availableHoursController = {
    index: async(req, res) => {
        let availableHours = await AvailableHour.findAll();
        let data = params => {
            return moment(params).locale("pt-br").format("L");
        }
        let semana = params => {
            return moment(params).locale("pt-br").format("dddd").toUpperCase();
        }
        return res.render("schedule", { availableHours, data, semana });
    },

    update: async(req, res) => {
        try {
            const { id } = req.params;
            const { available } = req.body;
            let availableHour = await AvailableHour.update({
                available
            }, {
                where: { id }
            });
            return res.status(200).json(availableHour);

        } catch (error) {
            return res.status(400).json("Horário não existe.");
        }
    },

    setHour: async(req, res) => {
        const hour_id = req.body.hour;
        const user = req.session.usuarioLogado;

        const hour = await AvailableHour.update({
            available: false,
        },{
            where: { id: hour_id }
        });

        const schedule = await Schedule.create({
            user_id: user.id,
            date_hour_id: hour_id
        });

    
        return res.render("consultschedule", {
            hour : hour,
            schedule: schedule
        });
    }
}


module.exports = availableHoursController;