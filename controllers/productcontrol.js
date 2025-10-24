const Product = require('../models/products');
const multer = require('multer');
const upload = multer();

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { isDeleted: false } });

    const formatted = products.map((p) => ({
      ...p.toJSON(),
      imageBase64: p.imageData ? p.imageData.toString('base64') : null,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, isDeleted: false },
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const formatted = {
      ...product.toJSON(),
      imageBase64: product.imageData
        ? product.imageData.toString('base64')
        : null,
    };

    res.json(formatted);
  } catch (err) {
    next(err);
  }
};

exports.addProduct = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      const payload = {
        ...req.body,
        imageData: req.file ? req.file.buffer : null,
      };

      const product = await Product.create(payload);
      res.status(201).json({
        ...product.toJSON(),
        imageBase64: product.imageData
          ? product.imageData.toString('base64')
          : null,
      });
    } catch (err) {
      next(err);
    }
  },
];

exports.updateProduct = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product || product.isDeleted) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const updates = {
        ...req.body,
      };

      if (req.file) {
        updates.imageData = req.file.buffer;
      }

      await product.update(updates);

      const data = product.toJSON();
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


exports.hideProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.update({ isDeleted: true });
    res.json(product);
  } catch (err) {
    next(err);
  }
};
