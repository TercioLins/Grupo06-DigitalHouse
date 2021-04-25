var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const ValidateUserRegister = require('../middlewares/ValidateUserRegister');
const ValidateUserUpdate = require('../middlewares/ValidateUserUpdate');

/* GET users listing. */
router.get("/", usersController.index);
router.post("/", ValidateUserRegister, usersController.create);
router.put("/:id", ValidateUserUpdate, usersController.update);
router.delete("/:id", usersController.delete);
router.get("/:id", usersController.find);

module.exports = router;
