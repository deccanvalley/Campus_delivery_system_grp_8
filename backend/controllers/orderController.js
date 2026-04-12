const Order = require('../models/Order');
const User = require('../models/User');

// CREATE ORDER
exports.createOrder = async (req, res) => {
    try {
        const { items, totalPrice, deliveryAddress } = req.body;

        const order = await Order.create({
            user: req.user._id,
            items,
            totalPrice,
            deliveryAddress,
            status: "pending"
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET USER ORDERS
exports.getMyOrders = async (req, res) => {
    try {
        if(req.user.role!== "student"){
            return res.status(403).json({
                success:false,
                message:"You are not allowed for this operation",
            })
        };

        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"You are not allowed for this operation",
            })
        };
        
        const orders = await Order.find().populate("user", "name email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"You are not allowed for this operation",
            })
        };

        const { status } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};