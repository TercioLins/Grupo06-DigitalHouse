var express = require('express');
var router = express.Router();
const availableHoursController = require('../controllers/AvailableHoursController');

/* GET home page. */
router.get('/', availableHoursController.index);
router.put('/:id', availableHoursController.update);

module.exports = router;