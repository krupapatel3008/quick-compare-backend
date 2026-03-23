const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    image: String,
    unit: String,

    prices: [
    {
      platform: String,
      price: Number,
      deliveryTime: String,
      inStock: Boolean
    }
  ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grocery", grocerySchema);