const Order = require("../models/Order")

export const getMyOrder = async (req, res) => {
    const partnerId = req.user.id;

    const order = await Order.findOne({
        deliveryPartner: partnerId,
        status: { $ne: "delivered" }
    }).populate("items.product");

    res.json(order);
};

export const updateDeliveryStatus = async (req, res) => {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);

    order.deliveryStatus = status;

    if (status === "delivered") {
        order.status = "delivered";

        const partner = await DeliveryPartner.findById(order.deliveryPartner);
        partner.isAvailable = true;
        partner.currentOrder = null;
        await partner.save();
    }

    await order.save();

    res.json(order);
};