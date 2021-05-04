var express = require("express");
const schedulesController = require("../controllers/schedulesController");
var router = express.Router();

/* GET users listing. */
// router.get("/:id", schedulesController.index);
router.get("/", schedulesController.searchUserHasSchedule);
router.post("/", schedulesController.create);
router.delete("/", schedulesController.delete);

module.exports = router;
