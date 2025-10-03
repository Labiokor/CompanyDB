const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  hideProduct,
  getProductById
} = require('../controllers/productcontrol');
const protect = require('../middleware/authmidware');

router.get('/products', protect, getProducts); 
router.get('/products/:id', protect, getProductById);        // Read
router.post('/products', protect, addProduct);         // Add
router.put('/products/:id', protect, updateProduct);    // Update
router.patch('/products/:id/hide', protect, hideProduct); // Soft delete

module.exports = router;
