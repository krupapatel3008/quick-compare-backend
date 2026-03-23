const router = require("express").Router();
const ctrl = require("../controllers/groceryController");

// 🛒 GET ALL PRODUCTS
router.get("/", ctrl.getGroceries);

// ➕ ADD PRODUCT
router.post("/", ctrl.addGrocery);

// ❌ DELETE PRODUCT
router.delete("/:id", ctrl.deleteGrocery);

// ✏️ UPDATE PRODUCT
router.put("/:id", ctrl.updateGrocery);

module.exports = router;