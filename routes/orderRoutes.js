const router = require("express").Router();
const ctrl = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/place", auth, ctrl.placeOrder);
router.get("/:userId", auth, ctrl.getOrders);
router.post("/status", auth, ctrl.updateOrderStatus);
router.get("/admin/all", auth, ctrl.getAllOrders);

module.exports = router;