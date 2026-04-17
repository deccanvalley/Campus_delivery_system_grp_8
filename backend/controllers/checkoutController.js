const Cart = require("../models/Cart");
import { assignDeliveryPartner } from "../utils/assignDelivery.js";

exports.checkout = async (req, res) => {
    try {
        // 1. Get user cart
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        // 2. Validate + calculate total
        let totalPrice = 0;

        const orderItems = cart.items.map(item => {
            const product = item.product;

            // Optional: check if product exists or is available
            if (!product) {
                throw new Error("Product not found");
            }

            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;

            return {
                product: product._id,
                quantity: item.quantity,
                price: product.price   // snapshot
            };
        });

        // 3. Create Order
        const order = new Order({
            user: req.user.id,
            items: orderItems,
            totalPrice,
            status: "Pending",
            deliveryType: req.body.deliveryType || "Pickup"
        });

        const deliveryPartner = await assignDeliveryPartner();

        order.deliveryPartner = deliveryPartner?._id || null;
        order.deliveryStatus = deliveryPartner ? "assigned" : "not_assigned";

        await order.save();

        if (deliveryPartner) {
            deliveryPartner.currentOrder = order._id;
            await deliveryPartner.save();
        }

        await order.save();

        // 4. Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};