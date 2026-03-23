const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

// ================== CHECK ENV ==================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

// ================== User Schema ==================
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ================== Users Data ==================
const users = [
  {
    name: "Krupa Patel",
    email: "krupa@gmail.com",
    password: "krupa@123",
    role: "admin",
  },
  {
    name: "Kanishk Chaudhari",
    email: "kanishk@gmail.com",
    password: "kanishk123",
  },
  {
    name: "Lalu Patel",
    email: "lalu@gmail.com",
    password: "user123",
  },
  {
    name: "Champaaa Patel",
    email: "Champaaa@gmail.com",
    password: "user123",
  },
  {
    name: "Shreya Patel",
    email: "shreya@gmail.com",
    password: "user123",
  },
  {
    name: "Deep Patel",
    email: "deep@gmail.com",
    password: "user123",
  },
];

// ================== DB CONNECT ==================
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
const seedUsers = async () => {
  try {
    await connectDB();

    // delete old users
    await User.deleteMany({});
    console.log("🗑 Old users cleared");

    // hash passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // insert users
    await User.insertMany(hashedUsers);

    console.log("🌱 Users Seeded Successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error while seeding:", error.message);
    mongoose.connection.close();
  }
};

seedUsers();