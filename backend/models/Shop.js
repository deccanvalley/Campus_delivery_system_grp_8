const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isOpen: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Shop", shopSchema);