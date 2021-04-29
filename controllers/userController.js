const { User, sequelize } = require('../models');

const userController = {
    index: async(req, res) => {
        let users = await User.findAll();
        return res.status(200).json(users);
    }


}
module.exports = userController;