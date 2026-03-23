const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://decentrix2005_db_user:P65c2YMjbBGQ5xEA@cluster0.4yisidr.mongodb.net/grocery-compare?retryWrites=true&w=majority")
  .then(() => {
    console.log("✅ Connected Successfully");
    process.exit();
  })
  .catch(err => {
    console.log("❌ Error:", err);
    process.exit(1);
  });