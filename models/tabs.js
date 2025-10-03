const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const tabs = sequelize.define(
  'Tab',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    timestamps: true,
    tableName: 'tabs',
  }
);

module.exports = tabs;
