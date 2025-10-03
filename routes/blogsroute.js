const express = require('express');
const BlogsController = require('../controllers/blogscontrol');
const protect = require('../middleware/authmidware');
const router = express.Router();

router.get('/', protect, BlogsController.getBlogs);
router.get('/:id', protect, BlogsController.getBlogById);
router.post('/', protect, BlogsController.addBlog);
router.put('/:id', protect, BlogsController.updateBlog);
router.patch('/:id/hide', protect, BlogsController.hideBlog);

module.exports = router;
