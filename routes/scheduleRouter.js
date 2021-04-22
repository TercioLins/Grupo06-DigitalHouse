var express = require("express");
const schedulesController = require("../controllers/scheduleController");
var router = express.Router();

/* GET users listing. */
router.get("/:id", schedulesController.index);
router.post("/", schedulesController.create);
router.delete("/:id", schedulesController.delete);

module.exports = router;
