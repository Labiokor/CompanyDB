const express = require('express');
const { getServices, addService, updateService, hideService } = require('../controllers/servicecontrol');
const protect = require('../middleware/authmidware');
const router = express.Router();

router.get('/', protect, getServices);
router.post('/', protect, addService);
router.put('/:id', protect, updateService);
router.patch('/:id/hide', protect, hideService);

module.exports = router;
