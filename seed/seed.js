const mongoose = require("mongoose");
const Grocery = require("../models/Grocery")
const Category = require("../models/Category")
require("dotenv").config();
const groceriesData = require("../groceries")

// ================== CHECK ENV ==================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

// ================== Data ==================
const groceries = groceriesData.mockGroceries
// const categories = groceriesData.categories
// const users = groceriesData.users

// ================== DB CONNECT FUNCTION ==================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
    process.exit(1);
  }
};

// ================== Seed Function ==================
const seedData = async () => {
  try {
    await connectDB();

    await Grocery.deleteMany({});
    // await Category.deleteMany({});

    console.log("🗑 Old data cleared");

    await Grocery.insertMany(groceries);
    // await Category.insertMany(categories);

    console.log("🌱 Data Seeded Successfully");

    mongoose.connection.close(); // ✅ better than process.exit()
  } catch (error) {
    console.error("❌ Error while seeding:", error.message);
    mongoose.connection.close();
  }
};

seedData();