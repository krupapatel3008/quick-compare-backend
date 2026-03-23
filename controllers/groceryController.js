const Grocery = require("../models/Grocery");
const Category = require("../models/Category");

// 🛒 GET ALL PRODUCTS
exports.getGroceries = async (req, res) => {
  try {
    const items = await Grocery.find().populate("category");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ ADD PRODUCT (WITH CATEGORY LOGIC)
exports.addGrocery = async (req, res) => {
  try {
    const { name, category, image, unit, prices } = req.body;

    // ✅ basic validation
    if (!name || !category || !unit) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    let categoryDoc;

    // ✅ check if category is ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(category);

    if (isObjectId) {
      categoryDoc = await Category.findById(category);

      if (!categoryDoc) {
        return res.status(400).json({ msg: "Invalid category ID" });
      }
    } else {
      // ✅ normalize name
      const categoryName = category.trim();

      categoryDoc = await Category.findOne({
        name: { $regex: new RegExp(`^${categoryName}$`, "i") },
      });

      // ✅ create if not exists
      if (!categoryDoc) {
        categoryDoc = await Category.create({ name: categoryName });
      }
    }

    const item = new Grocery({
      name,
      category: categoryDoc._id,
      image,
      unit,
      prices,
    });

    await item.save();

    // ✅ return populated product
    const populated = await item.populate("category");

    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE PRODUCT
exports.deleteGrocery = async (req, res) => {
  try {
    const item = await Grocery.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ UPDATE PRODUCT
exports.updateGrocery = async (req, res) => {
  try {
    const { name, category, image, unit, prices } = req.body;

    let updateData = { name, image, unit, prices };

    // ✅ handle category update if provided
    if (category) {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(category);

      let categoryDoc;

      if (isObjectId) {
        categoryDoc = await Category.findById(category);
      } else {
        const categoryName = category.trim();

        categoryDoc = await Category.findOne({
          name: { $regex: new RegExp(`^${categoryName}$`, "i") },
        });

        if (!categoryDoc) {
          categoryDoc = await Category.create({ name: categoryName });
        }
      }

      updateData.category = categoryDoc._id;
    }

    const updated = await Grocery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("category");

    if (!updated) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};