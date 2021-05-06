var express = require('express');
const availableHoursController = require('../controllers/availableHoursController');
const ValidadeLogin = require('../middlewares/ValidadeLogin');
var router = express.Router();

/* GET users listing. */
router.get('/', ValidadeLogin, availableHoursController.index);
router.put('/:id', availableHoursController.update);
router.post('/', availableHoursController.setHour);
module.exports = router;