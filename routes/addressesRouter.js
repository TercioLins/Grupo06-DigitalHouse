const express = require('express');
const router = express.Router();
const addressesController = require('../controllers/addressesController');

router.get('/', addressesController.index);
router.post('/', addressesController.create);
router.put('/:id', addressesController.update);
router.delete('/:id', addressesController.delete);
router.get('/:id', addressesController.show);

module.exports = router;