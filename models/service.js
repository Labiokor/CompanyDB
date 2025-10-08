const {DataTypes} = require('sequelize');
const sequelize = require('../connect');

const service = sequelize.define("Service",{
  title: { type: DataTypes.STRING, allowNull: false},
  description:{type: DataTypes.TEXT}, 
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
},
 { timestamps: true,
    tableName: 'services'
  });

module.exports = service;