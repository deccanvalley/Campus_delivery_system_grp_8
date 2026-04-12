const express = require('express');
const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Student routes
router.post('/', protect, authorizeRoles("student"), createOrder);
router.get('/my', protect, authorizeRoles("student"), getMyOrders);

// Admin routes
router.get('/', protect, authorizeRoles("admin"), getAllOrders);
router.put('/:id', protect, authorizeRoles("admin"), updateOrderStatus);

module.exports = router;