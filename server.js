require('dotenv').config({ path: 'config.env' });

const express = require('express');
const sequelize = require('./connect');
const cors = require('cors');
const errorHandler = require('./errorhandler');

const app = express();
app.use(express.json());
app.use(cors());

//Models
const User = require('./models/users');
const service = require('./models/service');
const product = require('./models/products');
const tabs = require('./models/tabs');
const pages = require('./models/pages');
const blogs = require('./models/blogs');

sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.log('Error: ' + err));

// Routes
const authRoutes = require('./routes/authroutes');
const serviceRoutes = require('./routes/serviceroutes');
const productRoutes = require('./routes/productroutes');
const tabsRoutes = require('./routes/tabsroute');
const pagesRoutes = require ('./routes/pagesroute') ;
const blogsRoutes = require ('./routes/blogsroute') ;

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tabs', tabsRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/blogs', blogsRoutes);



// Error handler
app.use(errorHandler);

//Health check  
app.get('/', (req, res) => {
  console.log('Root route registered');
  res.send('Server is up');
});


// Start server

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
