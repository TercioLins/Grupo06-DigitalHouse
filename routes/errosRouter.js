var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const schedulesController = require("../controllers/schedulesController");
const availableHoursController = require("../controllers/availableHoursController");
const addressesController = require("../controllers/addressesController");

router.get("/login", usersController.login);