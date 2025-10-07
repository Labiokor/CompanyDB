const express = require('express');
const TabsController = require('../controllers/tabscontrol');
const protect = require('../middleware/authmidware');
const router = express.Router();

router.get('/', TabsController.getTabs);
router.get('/:id', TabsController.getTabById);
router.post('/', protect, TabsController.addTab);
router.put('/:id', protect, TabsController.updateTab);
router.patch('/:id/hide', protect, TabsController.hideTab);

module.exports = router;
