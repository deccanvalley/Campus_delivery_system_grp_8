const Cart = require("../models/Cart");
const Product = require("../models/Product");


exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: { items: [] }
            });
        }

        res.status(200).json({
            success: true,
            cart,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (cart.items.length > 0) {
            const existingProduct = await Product.findById(cart.items[0].product);

            if (existingProduct.shop.toString() !== product.shop.toString()) {
                return res.status(400).json({
                    message: "You can only add items from one shop at a time"
                });
            }
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: []
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Product already exists → increase quantity
            cart.items[itemIndex].quantity += quantity || 1;
        } else {
            // New product
            cart.items.push({
                product: productId,
                quantity: quantity || 1
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            cart
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            cart
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            cart
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
