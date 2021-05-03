var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const schedulesController = require("../controllers/schedulesController");
const availableHoursController = require("../controllers/availableHoursController");
const addressesController = require("../controllers/addressesController");

router.get("/", (req, res, error) => {
    //carrega aqui a mensagem de erro.
    return res.status(400).json({error});
});

router.get("/voltar", (req, res) => {
    return res.redirect('/routes/index');
});

module.exports = router;