const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const blogs = sequelize.define(
  'Blogs',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    timestamps: true,
    tableName: 'blogs',
  }
);

module.exports = blogs;
