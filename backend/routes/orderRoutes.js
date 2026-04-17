const express = require('express');
const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController');

const {
    getMyOrder,
    updateDeliveryStatus
} = require('../controllers/deliveryController');


const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { checkout } = require("../controllers/orderController");

// Student routes
router.post('/', protect, authorizeRoles("student"), createOrder);
router.get('/my', protect, authorizeRoles("student"), getMyOrders);
router.post("/checkout", protect, checkout);

// Admin routes
router.get('/', protect, authorizeRoles("admin"), getAllOrders);
router.put('/:id', protect, authorizeRoles("admin"), updateOrderStatus);
router.put('/:id', protect, authorizeRoles("admin"), deleteOrder);

// Delivery routes
router.get("/delivery/my-order", protect, authorizeRoles("delivery"), getMyOrder);
router.post("/delivery/update-status", protect, authorizeRoles("delivery"), updateDeliveryStatus);

module.exports = router;