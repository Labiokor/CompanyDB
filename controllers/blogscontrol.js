const Blogs = require('../models/blogs');
const multer = require('multer');
const upload = multer();

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blogs.findAll({ where: { isDeleted: false } });

    
    const formatted = blogs.map((d) => ({
      ...d.toJSON(),
      imageBase64: d.imageData ? d.imageData.toString('base64') : null,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blogs.findOne({ where : {id: req.params.id , isDeleted: false} 
    });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const formatted = {
      ...blog.toJSON(),
      imageBase64: blog.imageData
        ? blog.imageData.toString('base64')
        : null,
    };
    res.json(formatted);
  } catch (err) {
    next(err);
  }
};

exports.addBlog = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      const payload = {
        ...req.body,
        imageData: req.file ? req.file.buffer : null,
      };

      const blog = await Blogs.create(payload);
      res.status(201).json({
        ...blog.toJSON(),
        imageBase64: blog.imageData
          ? blog.imageData.toString('base64')
          : null,
      });
    } catch (err) {
      next(err);
    }
  },
];


exports.updateBlog = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      const blog = await Blogs.findByPk(req.params.id);
      if (!blog || blog.isDeleted) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      const updates = {
        ...req.body,
      };

      if (req.file) {
        updates.imageData = req.file.buffer;
      }

      await blog.update(updates);

      const data = blog.toJSON();
      const formatted = {
        ...data,
        imageBase64: data.imageData
          ? `data:image/jpeg;base64,${data.imageData.toString('base64')}`
          : null
      };

      res.json(formatted);
    } catch (err) {
      next(err);
    }
  }
];

exports.hideBlog = async (req, res, next) => {
  try {
     const blog = await Blogs.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'blogs not found' });

    await blog.update({ isDeleted: true });
    res.json(blog);
  } catch (err) { next(err); }
};