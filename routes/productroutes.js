const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  hideProduct
} = require('../controllers/productcontrol');
const protect = require('../middleware/authmidware');

router.get('/', protect, getProducts);         // Read
router.post('/', protect, addProduct);         // Add
router.put('/:id', protect, updateProduct);    // Update
router.patch('/:id/hide', protect, hideProduct); // Soft delete

module.exports = router;
