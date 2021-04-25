const {AvailableHour, sequelize} = require('../models');
// const schedules = require('./schedulesController');

const availableHoursController = {
    index: async (req, res) => {
        // let teste = schedules.searchUserHasSchedule(req, res);
        let availableHours = await AvailableHour.findAll();
        return res.status(200).json(availableHours);
    },
    update: async (req, res) => {
        const {id} = req.params;
        const {date, hour, available} = req.body;
        let availableHour = await AvailableHour.update({
            available
        }, {
            where: {id}
        });
        return res.status(200).json(availableHour);
    }
}

module.exports = availableHoursController;