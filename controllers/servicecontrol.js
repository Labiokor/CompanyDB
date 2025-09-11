const Service = require('../models/service');

exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isDeleted: false });
    res.json(services);
  } catch (err) { next(err); }
};

exports.addService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) { next(err); }
};

exports.updateService = async (req, res, next) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.hideService = async (req, res, next) => {
  try {
    const hidden = await Service.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.json(hidden);
  } catch (err) { next(err); }
};
