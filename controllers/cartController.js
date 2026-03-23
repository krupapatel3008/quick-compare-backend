const Cart = require("../models/Cart");

// Get Cart
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { items: [] });
};

// Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existing = cart.items.find(
    (i) => i.productId.toString() === product.productId
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push(product);
  }

  await cart.save();
  res.json(cart);
};

// Remove item
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter(
    (i) => i.productId.toString() !== productId
  );

  await cart.save();
  res.json(cart);
};