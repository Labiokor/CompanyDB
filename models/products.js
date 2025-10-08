const {DataTypes} = require('sequelize');
const sequelize = require('../connect');

const product = sequelize.define("Product",{
  name: { type: DataTypes.STRING, allowNull: false },
  description:{type: DataTypes.TEXT},
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
},
 { timestamps: true ,
   tableName: 'products'
 });

module.exports = product;