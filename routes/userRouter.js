const express = require('express');
const router = express.Router();
const userCotroller = require('../controllers/userController');

/* GET users listing. */
router.get('/', userCotroller.index);

module.exports = router;