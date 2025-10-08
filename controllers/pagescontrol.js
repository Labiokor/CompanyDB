const Pages = require('../models/pages');

exports.getPages = async (req, res, next) => {
  try {
    const pages = await Pages.findAll({ where: { isDeleted: false } });
    res.json(pages);
  } catch (err) {
    next(err);
  }
};

exports.getPageById = async (req, res, next) => {
  try {
    const pages = await Pages.findOne({ where : {id: req.params.id , isDeleted: false} 
    });
    if (!pages) return res.status(404).json({ message: 'Pages not found' });
    res.json(pages);
  } catch (err) {
    next(err);
  }
};

exports.addPage = async (req, res, next) => {
  try {
    const {title, content} = req.body
    const pages = await Pages.create({title, content});
    res.status(201).json(pages);
  } catch (err) { next(err); }
};

exports.updatePage = async (req, res, next) => {
  try {
    const pages = await Pages.findByPk(req.params.id);
    if (!pages) return res.status(404).json({ message: 'Pages not found' });

    await pages.update(req.body);
    res.json(pages);
  } catch (err) { next(err); }
};

exports.hidePage = async (req, res, next) => {
  try {
     const pages = await Pages.findByPk(req.params.id);
    if (!pages) return res.status(404).json({ message: 'Pages not found' });

    await pages.update({ isDeleted: true });
    res.json(pages);
  } catch (err) { next(err); }
};
