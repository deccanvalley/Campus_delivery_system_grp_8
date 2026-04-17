import DeliveryPartner from "../models/DeliveryPartner.js";

export const assignDeliveryPartner = async () => {
    return await DeliveryPartner.findOneAndUpdate(
        { isAvailable: true },
        { isAvailable: false },
        { new: true }
    );
};