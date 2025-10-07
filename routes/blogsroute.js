const express = require('express');
const BlogsController = require('../controllers/blogscontrol');
const protect = require('../middleware/authmidware');
const router = express.Router();

router.get('/', BlogsController.getBlogs);
router.get('/:id', BlogsController.getBlogById);
router.post('/', protect, BlogsController.addBlog);
router.put('/:id', protect, BlogsController.updateBlog);
router.patch('/:id/hide', protect, BlogsController.hideBlog);

module.exports = router;
