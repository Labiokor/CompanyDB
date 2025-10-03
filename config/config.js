require('dotenv').config({ path: 'config.env' });

module.exports = {
  "development": {
    use_env_variable: "POST_URL",
    "dialect": "postgres",
    dialectOptions: {
       ssl: { 
        require: true, 
        rejectUnauthorized: false
       } 
      }
  },
  "test": {
    use_env_variable: "POST_URL",
    "dialect": "postgres",
    dialectOptions: {
       ssl: { 
        require: true, 
        rejectUnauthorized: false
       } 
      }
  },
  "production": {
    use_env_variable: "POST_URL",
    "dialect": "postgres",
    dialectOptions: {
       ssl: { 
        require: true, 
        rejectUnauthorized: false
       } 
      }
  }
}
