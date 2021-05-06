var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const ValidateUserRegister = require('../middlewares/ValidateUserRegister');
const ValidateUserUpdate = require('../middlewares/ValidateUserUpdate');
const ValidadeLogin = require('../middlewares/ValidadeLogin');
const ValidadeForgotPassword = require('../middlewares/ValidadeForgotPassword');
const ValidateUserLoged = require('../middlewares/ValidateUserLoged');

/* GET users listing. */
router.get("/", ValidateUserLoged, usersController.login);
router.get("/register", usersController.register);
router.get("/forgotpassword", usersController.forgetPasswordpage);
router.get("/updateprofile", ValidadeLogin, usersController.updateUserProfilePage);
router.get("/userWithSchedule", ValidadeLogin, usersController.userWithSchedule);
router.get("/userWithoutSchedule", ValidadeLogin, usersController.userWithoutSchedule);
router.get("/userprofile", ValidadeLogin, usersController.LoadUserPage);
router.get("/logout", usersController.logout);

router.get("/delete", ValidadeLogin, usersController.delete);

router.post("/", usersController.loginAuth);
router.post("/register", ValidateUserRegister, usersController.create);
router.post("/updateprofile", ValidateUserUpdate, usersController.update);
router.post("/forgotpassword", ValidateUserLoged, ValidadeForgotPassword, usersController.forgotPassword);

module.exports = router;
