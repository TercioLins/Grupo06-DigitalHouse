const { Schedule, sequelize } = require("../models");

const schedulesController = {
    index: async (req, res) => {
        let schedule = await Schedule.findAll();
        return res.status(200).json(schedule);
    },
    create: async (req, res) => {
        let {user_id, date_hour_id} = req.body;
        
        let schedule = await Schedule.create({
            user_id, date_hour_id
        });

        return res.status(200).json(schedule);
    },
    delete: async (req, res) => {
        let {id} = req.params;
        await Schedule.destroy({where: {
            id: schedule.id
        }});
        return res.send('Agendamento cancelado!');
    }
};

module.exports = schedulesController;
