import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema({
    name: String,
    phone: String,

    isAvailable: {
        type: Boolean,
        default: true
    },

    currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null
    }
}, { timestamps: true });

export default mongoose.model("DeliveryPartner", deliveryPartnerSchema);