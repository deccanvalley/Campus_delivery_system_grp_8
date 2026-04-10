const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
          ref: "User" },
  pickupLocation: String,
  deliveryLocation: String,
  item: String,
  status: {
    type: String,
    enum: ["pending", "assigned", "delivered"],
    default: "pending"
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, 
                ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);