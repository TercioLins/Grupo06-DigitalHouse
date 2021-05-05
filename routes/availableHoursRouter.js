var express = require('express');
const availableHoursController = require('../controllers/availableHoursController');
var router = express.Router();

/* GET users listing. */
router.get('/', availableHoursController.index);
router.put('/:id', availableHoursController.update);
router.post('/', availableHoursController.setHour);
module.exports = router;