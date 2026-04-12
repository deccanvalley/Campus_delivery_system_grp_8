const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: String,
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  deliveryAddress: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending'
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  paidAt: Date

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);