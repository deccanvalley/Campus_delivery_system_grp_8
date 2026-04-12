const Product = require('../models/Product');

// CREATE PRODUCT (ADMIN)
exports.createProduct = async (req, res) => {
    try {
        if(req.user.role!== "admin"){
            return res.status(403).json({
                success:false,
                message:"You are not allowed for this operation",
            })
        };
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        if(req.user.role!== "admin"){
            return res.status(403).json({
                success:false,
                message:"You are not allowed for this operation",
            })
        };
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};