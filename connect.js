
require('dotenv').config({ path: 'config.env' }); 
const { Sequelize } = require('sequelize'); 

const sequelize = new Sequelize(process.env.POST_URL,        
  { 
    dialect: 'postgres', 
    protocol : 'postgres', 
    dialectOptions: {
       ssl: { 
        require: true, 
        rejectUnauthorized: false
       } 
      },      
    logging: false             
  });
  
// Test DB connection
  sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;



