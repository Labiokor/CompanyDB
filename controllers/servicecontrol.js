const multer = require('multer');
const Service = require('../models/service');
const upload = multer();

exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.findAll({ where: { isDeleted: false } });

    
    const formatted = services.map((s) => ({
      ...s.toJSON(),
      imageBase64: s.imageData ? s.imageData.toString('base64') : null,
    }));
    res.json(formatted);
  } catch (err) {
    next(err);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findOne({ where: {isDeleted: false }});
     if (!service) return res.status(404).json({ message: 'Service not found' });

         const formatted = {
      ...service.toJSON(),
      imageBase64: service.imageData
        ? service.imageData.toString('base64')
        : null,
    };
    res.json(formatted);
  } catch (err) {
    next(err);
  }
};

exports.addService = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      const payload = {
        ...req.body,
        imageData: req.file ? req.file.buffer : null,
      };

      const service = await Service.create(payload);
      res.status(201).json({
        ...service.toJSON(),
        imageBase64: service.imageData
          ? service.imageData.toString('base64')
          : null,
      });
    } catch (err) {
      next(err);
    }
  },
];


exports.updateService = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      const service = await Service.findByPk(req.params.id);
      if (!service || service.isDeleted) {
        return res.status(404).json({ message: 'Service not found' });
      }

      const updates = {
        ...req.body,
      };

      if (req.file) {
        updates.imageData = req.file.buffer;
      }

      await service.update(updates);

      const data = service.toJSON();
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

exports.hideService = async (req, res, next) => {
  try {
     const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.update({ isDeleted: true });
    res.json(service);
  } catch (err) { next(err); }
};
