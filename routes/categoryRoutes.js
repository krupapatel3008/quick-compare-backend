const router = require("express").Router();
const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Get all categories
router.get("/", getCategories);

// Add new category (Admin)
router.post("/", addCategory);

// Delete category (Admin)
router.delete("/:id", deleteCategory);

module.exports = router;