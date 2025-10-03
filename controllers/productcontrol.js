const Product = require('../models/products');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { isDeleted: false } });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where : {id: req.params.id , isDeleted: false} 
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.update(req.body);
    res.json(product);
  } catch (err) { next(err); }
};

exports.hideProduct = async (req, res, next) => {
  try {
     const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.update({ isDeleted: true });
    res.json(product);
  } catch (err) { next(err); }
};
