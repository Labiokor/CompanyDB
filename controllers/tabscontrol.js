const Tabs = require('../models/tabs');

exports.getTabs = async (req, res, next) => {
  try {
    const tabs = await Tabs.findAll({ where: { isDeleted: false } });
    res.json(tabs);
  } catch (err) {
    next(err);
  }
};

exports.getTabById = async (req, res, next) => {
  try {
    const tab = await Tabs.findOne({ where : {id: req.params.id , isDeleted: false} 
    });
    if (!tab) return res.status(404).json({ message: 'Tab not found' });
    res.json(tab);
  } catch (err) {
    next(err);
  }
};

exports.addTab = async (req, res, next) => {
  try {
    const tab = await Tabs.create(req.body);
    res.status(201).json(tab);
  } catch (err) { next(err); }
};

exports.updateTab = async (req, res, next) => {
  try {
    const tab = await Tabs.findByPk(req.params.id);
    if (!tab) return res.status(404).json({ message: 'Tab not found' });

    await tab.update(req.body);
    res.json(tab);
  } catch (err) { next(err); }
};

exports.hideTab = async (req, res, next) => {
  try {
     const tab = await Tabs.findByPk(req.params.id);
    if (!tab) return res.status(404).json({ message: 'Tab not found' });

    await tab.update({ isDeleted: true });
    res.json(tab);
  } catch (err) { next(err); }
};
