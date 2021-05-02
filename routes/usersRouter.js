var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const usersController = require("../controllers/usersController");
const ValidateUserRegister = require('../middlewares/ValidateUserRegister');
const ValidateUserUpdate = require('../middlewares/ValidateUserUpdate');
const ValidadeLogin = require('../middlewares/ValidadeLogin');
const ValidadeForgotPassword = require('../middlewares/ValidadeForgotPassword');

/* GET users listing. */
router.get("/", usersController.index);
router.post("/", ValidateUserRegister, usersController.create);
router.put("/:id", ValidateUserUpdate, usersController.update);
router.delete("/:id", usersController.delete);
router.get("/:id", usersController.find);
router.post("/login", ValidadeLogin ,usersController.login);
router.post("/forgotpassword", ValidadeForgotPassword, usersController.forgotPassword);

module.exports = router;
