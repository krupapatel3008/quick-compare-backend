const Order = require("../models/Order");

const generateOrderId = () => "ORD-" + Date.now();

// =======================
// ✅ PLACE ORDER
// =======================
exports.placeOrder = async (req, res) => {
  try {
    const { userId, userName, items, totalPrice } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "User ID required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "Cart empty" });
    }

    const order = new Order({
      orderId: generateOrderId(),
      userId, // 🔥 linked to user
      userName,
      items,
      totalPrice,
      status: "placed",
      trackingSteps: [
        {
          label: "Order Placed",
          time: new Date().toLocaleString(),
          done: true,
        },
        { label: "Packed", time: "", done: false },
        { label: "In Transit", time: "", done: false },
        { label: "Delivered", time: "", done: false },
      ],
    });

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// ✅ GET USER ORDERS
// =======================
exports.getOrders = async (req, res) => {
  try {
    // console.log("Request: ",req.params.userId)
    const orders = await Order.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// ✅ UPDATE ORDER STATUS
// =======================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    const stepsOrder = ["placed", "packed", "in_transit", "delivered"];
    const currentIndex = stepsOrder.indexOf(status);

    if (currentIndex === -1) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    order.status = status;

    order.trackingSteps = order.trackingSteps.map((step, i) => {
      if (i <= currentIndex) {
        return {
          ...step,
          done: true,
          time: step.time || new Date().toLocaleString(),
        };
      }
      return step;
    });

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    // 🔐 Only admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { status, search } = req.query;

    // console.log("Status: ", status)
    // console.log("search: ", search)
    let query = {};

    // ✅ Filter by status
    if (status && status !== "all") {
      query.status = status;
    }

    // ✅ Search (orderId OR userName)
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};