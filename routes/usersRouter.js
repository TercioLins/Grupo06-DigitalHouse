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
router.get("/forgotpassword", usersController.forgetPasswordpage);
router.get("/updateprofile", usersController.updateUserProfilePage);
router.get("/userWithSchedule", usersController.userWithSchedule);
router.get("/userWithoutSchedule", usersController.userWithoutSchedule);
router.get("/userprofile", ValidadeLogin, usersController.LoadUserPage);

router.delete("/:id", usersController.delete);

router.post("/", usersController.loginAuth);
router.post("/register",  usersController.create);
router.post("/updateprofile", usersController.updateUserProfilePage);
router.post("/forgotpassword", usersController.forgotPassword);

module.exports = router;
