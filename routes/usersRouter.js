var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const ValidateUserRegister = require('../middlewares/ValidateUserRegister');
const ValidateUserUpdate = require('../middlewares/ValidateUserUpdate');
const ValidadeLogin = require('../middlewares/ValidadeLogin');
const ValidadeForgotPassword = require('../middlewares/ValidadeForgotPassword');

/* GET users listing. */
router.get("/", usersController.login);
router.get("/register", usersController.register);
router.get("/userprofile", ValidadeLogin, usersController.LoadUserPage);
router.get("/forgotpassword", usersController.forgetPasswordpage);
router.get("/userWithSchedule", usersController.userWithSchedule);
router.get("/userWithoutSchedule", usersController.userWithoutSchedule);
router.get("/userprofile", ValidadeLogin, usersController.LoadUserPage);
router.post("/create", usersController.create);

router.put("/:id", ValidateUserUpdate, usersController.update);
router.delete("/:id", usersController.delete);

router.post("/", usersController.loginAuth);
router.post("/register", ValidateUserRegister, usersController.create);
//router.post("/userprofile", usersController.LoadUserPage);
router.post("/forgotpassword", usersController.forgotPassword);

module.exports = router;
