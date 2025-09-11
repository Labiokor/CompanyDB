require('dotenv').config({ path: 'config.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./errorhandler');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authroutes');
const serviceRoutes = require('./routes/serviceroutes');
const productRoutes = require('./routes/productroutes');

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);

// Error handler
app.use(errorHandler);

//Health check  
app.get('/', (req, res) => {
  console.log('Root route registered');
  res.send('Server is up');
});


// MongoDB Connection
mongoose.connect(process.env.ATLAS_URI) .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message));

  mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Start server

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
