const router = require("express").Router();
const ctrl = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.get("/:userId", auth, ctrl.getCart);
router.post("/add", auth, ctrl.addToCart);
router.post("/remove", auth, ctrl.removeFromCart);

module.exports = router;