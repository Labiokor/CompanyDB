const Service = require('../models/service');

exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.findAll({ where: { isDeleted: false } });
    res.json(services);
  } catch (err) {
    next(err);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findOne({ where: {isDeleted: false }});
     if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    next(err);
  }
};

exports.addService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) { next(err); }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.update(req.body);
    res.json(service);
  } catch (err) { next(err); }
};

exports.hideService = async (req, res, next) => {
  try {
     const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.update({ isDeleted: true });
    res.json(service);
  } catch (err) { next(err); }
};
