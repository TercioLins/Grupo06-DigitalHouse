var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const ValidateUserRegister = require('../middlewares/ValidateUserRegister');
const ValidateUserUpdate = require('../middlewares/ValidateUserUpdate');
const ValidadeLogin = require('../middlewares/ValidadeLogin');
const ValidadeForgotPassword = require('../middlewares/ValidadeForgotPassword');

/* GET users listing. */
router.get("/", usersController.index);
router.get('/register', usersController.register);
router.get("/userprofile", ValidadeLogin, usersController.LoadUserPage);

router.put("/:id", ValidateUserUpdate, usersController.update);
router.delete("/:id", usersController.delete);

router.post("/", ValidateUserRegister, usersController.create);
router.post("/login", usersController.loginAuth);
router.post("/forgotpassword", ValidadeForgotPassword, usersController.forgotPassword);

module.exports = router;
