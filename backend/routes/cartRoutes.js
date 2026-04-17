const express = require("express");
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require("../controllers/cartController");

const {checkout} = require("..controllers/checkoutController");

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get("/", protect, authorizeRoles("student"), getCart);
router.post("/add", protect, authorizeRoles("student"), addToCart);
router.put("/update", protect, authorizeRoles("student"), updateCartItem);
router.delete("/remove", protect, authorizeRoles("student"), removeFromCart);
router.delete("/clear", protect, authorizeRoles("student"), clearCart);

router.post("/checkout", protect, checkout);

module.exports = router;