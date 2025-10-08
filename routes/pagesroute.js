const express = require('express');
const PagesController = require('../controllers/pagescontrol');
const protect = require('../middleware/authmidware');
const router = express.Router();

router.get('/', PagesController.getPages);
router.get('/:id', PagesController.getPageById);
router.post('/', protect, PagesController.addPage);
router.put('/:id', protect, PagesController.updatePage);
router.patch('/:id/hide', protect, PagesController.hidePage);

module.exports = router;
