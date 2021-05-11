var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const ValidateUserRegister = require('../middlewares/ValidateUserRegister');
const ValidateUserUpdate = require('../middlewares/ValidateUserUpdate');
const ValidadeLogin = require('../middlewares/ValidadeLogin');
const ValidadeForgotPassword = require('../middlewares/ValidadeForgotPassword');
const ValidateUserLoged = require('../middlewares/ValidateUserLoged');
const ValidateAdmin = require('../middlewares/ValidateAdmin');

/* GET users listing. */
router.get("/", ValidateUserLoged, usersController.login);
router.get("/register", usersController.register);
router.get("/forgotpassword", usersController.forgetPasswordpage);
router.get("/updateprofile", ValidadeLogin, usersController.updateUserProfilePage);
router.get("/userWithSchedule", ValidadeLogin, usersController.userWithSchedule);
router.get("/userWithoutSchedule", ValidadeLogin, usersController.userWithoutSchedule);
router.get("/adminDashboard", ValidateAdmin, ValidadeLogin, usersController.adminDashboard);
router.get("/userprofile", ValidadeLogin, usersController.LoadUserPage);
router.get("/logout", usersController.logout);

router.get("/delete", ValidadeLogin, usersController.delete);

router.post("/", usersController.loginAuth);
router.post("/register", ValidateUserRegister, usersController.create);
router.post("/updateprofile", usersController.update);
router.post("/forgotpassword", ValidateUserLoged, ValidadeForgotPassword, usersController.forgotPassword);
router.post("/consult", ValidateAdmin, usersController.consultUser);
router.post("/vaccinated", ValidateAdmin, usersController.vaccinated);

module.exports = router;
