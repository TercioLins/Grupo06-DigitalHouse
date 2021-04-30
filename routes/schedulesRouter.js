var express = require("express");
const schedulesController = require("../controllers/schedulesController");
var router = express.Router();

/* GET users listing. */
router.get("/:id", schedulesController.index);
router.get("/user_id/:id", schedulesController.searchUserHasSchedule);
router.post("/", schedulesController.create);
router.delete("/:id", schedulesController.delete);

module.exports = router;
