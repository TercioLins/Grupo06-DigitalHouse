var express = require("express");
var router = express.Router();
const schedulesController = require("../controllers/scheduleController");

/* GET home page. */
router.get("/", schedulesController.index);
router.post("/", schedulesController.create);
router.delete("/:id", schedulesController.delete);

module.exports = router;