const Product = require('../models/products');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.json(products);
  } catch (err) { next(err); }
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.hideProduct = async (req, res, next) => {
  try {
    const hidden = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.json(hidden);
  } catch (err) { next(err); }
};
