const {DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../connect');

const User = sequelize.define('User' ,{
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, 
          allowNull: false, 
          unique: true , 
          validate: { isEmail: true }
  },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, 
{ 
  tableName: 'Users',
  timestamps: true,
  hooks: { 
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
  }
}
});

User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;