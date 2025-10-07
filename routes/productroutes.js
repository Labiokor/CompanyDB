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

router.get('/', getProducts); 
router.get('/:id', getProductById);        // Read
router.post('/', protect, addProduct);         // Add
router.put('/:id', protect, updateProduct);    // Update
router.patch('/:id/hide', protect, hideProduct); // Soft delete

module.exports = router;
