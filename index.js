// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ================== MongoDB Connection ==================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ DB Error:", err));

// // ================== Schemas ==================
// const grocerySchema = new mongoose.Schema({
//   "_id": "ObjectId",
//   "name": "string",
//   "category": "string",
//   "image": "string (URL)",
//   "unit": "string (e.g. '1 kg', '500 ml')",
//   "prices": {
//     "blinkit": "number | null",
//     "zepto": "number | null",
//     "instamart": "number | null",
//     "bigbasket": "number | null"
//   },
//   "createdAt": "Date",
//   "updatedAt": "Date"
// }
// );

// const orderSchema = new mongoose.Schema({
//   "_id": "ObjectId",
//   "orderId": "string (e.g. 'ORD-1234567890')",
//   "userId": "ObjectId (ref: users)",
//   "userName": "string",
//   "items": [
//     {
//       "productId": "ObjectId (ref: products)",
//       "name": "string",
//       "platform": "string",
//       "price": "number",
//       "quantity": "number"
//     }
//   ],
//   "totalPrice": "number",
//   "status": "string (enum: 'placed' | 'packed' | 'in_transit' | 'delivered')",
//   "trackingSteps": [
//     { "label": "string", "time": "string", "done": "boolean" }
//   ],
//   "createdAt": "Date"
// })

// const cartSchema = new mongoose.Schema({
//   "_id": "ObjectId",
//   "userId": "ObjectId (ref: users)",
//   "items": [
//     {
//       "productId": "ObjectId (ref: products)",
//       "platform": "string",
//       "price": "number",
//       "quantity": "number"
//     }
//   ],
//   "updatedAt": "Date"
// }
// )

// const categorySchema = new mongoose.Schema({
//   name: String
// });

// const userSchema = new mongoose.Schema({
//   "_id": "ObjectId",
//   "name": "string",
//   "email": "string (unique)",
//   "password": "string (hashed)",
//   "role": "string (enum: 'user' | 'admin')",
//   "createdAt": "Date"
// });

// const Grocery = mongoose.model("Grocery", grocerySchema);
// const Category = mongoose.model("Category", categorySchema);
// const User = mongoose.model("User", userSchema)

// // ================== Routes ==================

// // Get all groceries (from DB)
// app.get("/api/groceries", async (req, res) => {
//   try {
//     const items = await Grocery.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get categories (from DB)
// app.get("/api/categories", async (req, res) => {
//   try {
//     const cats = await Category.find();
//     res.json(cats);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add grocery (for testing / admin)
// app.post("/api/groceries", async (req, res) => {
//   try {
//     const item = new Grocery(req.body);
//     await item.save();
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================== Server ==================
// app.listen(5000, () => {
//   console.log("🚀 Server running on port 5000");
// });


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/groceries", require("./routes/groceryRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(80, () =>
  console.log("🚀 Server running on port 80")
);