const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin only
router.post('/', protect, authorizeRoles("admin"), createProduct);
router.delete('/:id', protect, authorizeRoles("admin"), deleteProduct);

module.exports = router;