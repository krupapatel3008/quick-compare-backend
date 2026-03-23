const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    // ✅ USER LINK (IMPORTANT)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    userName: String,

    items: [
      {
        productId: String,
        name: String,
        platform: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalPrice: Number,

    status: {
      type: String,
      enum: ["placed", "packed", "in_transit", "delivered"],
      default: "placed",
    },

    trackingSteps: [
      {
        label: String,
        time: String,
        done: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);