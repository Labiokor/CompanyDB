const express = require('express');
const { 
    getServiceById,
    addService, 
    updateService, 
    hideService } = require('../controllers/servicecontrol');
const protect = require('../middleware/authmidware');
const router = express.Router();


router.get('/:id', protect, getServiceById);
router.post('/', protect, addService);
router.put('/:id', protect, updateService);
router.patch('/:id/hide', protect, hideService);

module.exports = router;
