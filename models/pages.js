const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const pages = sequelize.define(
  'Pages',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    timestamps: true,
    tableName: 'pages',
  }
);

module.exports = pages;
