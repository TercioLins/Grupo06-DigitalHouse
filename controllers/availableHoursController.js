const { AvailableHour, Schedule, sequelize } = require('../models');
const moment = require("moment");
const { Op } = require('sequelize/types');

const availableHoursController = {
    index: async(req, res) => {
        let consultAvailable = await AvailableHour.findOne({
            where: {date: moment().add(1, "days").utc().format("YYYY-MM-DD")}
        });
        if (moment().locale("pt-br").day() >= 0 && !consultAvailable) {
            for (let i = 1; i <= 7; i++) {
                let date = moment().add(i, "days").utc().format("YYYY-MM-DD");
                for (let i = 8; i <= 17; i++) {
                    let hour = `${i}:00`;
                    await AvailableHour.create({
                        date,
                        hour
                    });
                }
            }
        };
        await AvailableHour.update({
            available: false
        }, {
            where: {date: {
                [Op.gte]: moment().subtract(7, 'days').toDate()
            }}
        });  
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

        const data = params => {
            return moment(params).locale("pt-br").format("L");
        }
        const semana = params => {
            return moment(params).locale("pt-br").format("dddd").toUpperCase();
        }

        await AvailableHour.update({
            available: false
        },{
            where: { id: hour_id }
        });

        const avahour = await AvailableHour.findOne({
            where: {id: hour_id}
        });

        await Schedule.create({
            user_id: user.id,
            date_hour_id: hour_id
        });
    
        return res.render("consultschedule", {
            avahour,
            data,
            semana
        });
    }
}


module.exports = availableHoursController;