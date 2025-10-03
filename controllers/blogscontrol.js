const Blogs = require('../models/blogs');

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blogs.findAll({ where: { isDeleted: false } });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blogs.findOne({ where : {id: req.params.id , isDeleted: false} 
    });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.addBlog = async (req, res, next) => {
  try {
    const blog = await Blogs.create(req.body);
    res.status(201).json(blog);
  } catch (err) { next(err); }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blogs.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await blog.update(req.body);
    res.json(blog);
  } catch (err) { next(err); }
};

exports.hideBlog = async (req, res, next) => {
  try {
     const blog = await Blogs.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'blogs not found' });

    await blog.update({ isDeleted: true });
    res.json(blog);
  } catch (err) { next(err); }
};