const express = require('express');
const PagesController = require('../controllers/tabscontrol');
const protect = require('../middleware/authmidware');
const router = express.Router();

router.get('/', protect, PagesController.getPages);
router.get('/:id', protect, PagesController.getPageById);
router.post('/', protect, PagesController.addPage);
router.put('/:id', protect, PagesController.updatePage);
router.patch('/:id/hide', protect, PagesController.hidePage);

module.exports = router;
