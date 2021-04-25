var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const ValidateUser = require('../middlewares/ValidateUser');

/* GET users listing. */
router.get("/", usersController.index);
router.post("/", ValidateUser, usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);
router.get("/:id", usersController.find);

module.exports = router;
