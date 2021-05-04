var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const ValidateUserRegister = require('../middlewares/ValidateUserRegister');
const ValidateUserUpdate = require('../middlewares/ValidateUserUpdate');
const ValidadeLogin = require('../middlewares/ValidadeLogin');
const ValidadeForgotPassword = require('../middlewares/ValidadeForgotPassword');

/* GET users listing. */
router.get("/", usersController.index);
router.get("/register", usersController.register);
router.get("/forgotpassword", usersController.forgetPasswordpage);
router.get("/userWithSchedule", usersController.userWithSchedule);
router.get("/userWithoutSchedule", usersController.userWithoutSchedule);

router.put("/:id", ValidateUserUpdate, usersController.update);
router.delete("/:id", usersController.delete);

router.post("/", usersController.loginAuth);
router.post("/register", ValidateUserRegister, usersController.create);
router.get("/userprofile", ValidadeLogin, usersController.LoadUserPage);
router.post("/forgotpassword", ValidadeForgotPassword, usersController.forgotPassword);

module.exports = router;
