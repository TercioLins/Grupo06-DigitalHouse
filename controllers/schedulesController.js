const { Schedule, sequelize } = require("../models");

const schedulesController = {
    
    index: async (req, res) => {
        let {id} = req.params;
        let schedule = await Schedule.findOne({
            where: {
                id
            }
        });
        return res.status(200).json(schedule);
    },

    create: async (req, res) => {
        let {user_id, date_hour_id} = req.body;

        if(!user_id || !!date_hour_id)
            return res.status(401).json({message:"Campo nao preenchido."});

        let schedule = await Schedule.create({
            user_id, date_hour_id
        });

        return res.status(200).json(schedule);
    },

    delete: async (req, res) => {
        let {id} = req.params;
        await Schedule.destroy({where: {
            id
        }});
        return res.send('Agendamento cancelado!');
    },

    searchUserHasSchedule: async (req, res) => {
        try{
            let {id} = req.session.usuarioLogado;
            let schedule = await Schedule.findAll({
                where: {
                    user_id: id
                }
            });
        
            res.render("consultschedule", {schedule});
            
        } catch {
            return res.status(401).json({error: "Invalid Request!"});
        }
         
    }
};

module.exports = schedulesController;
