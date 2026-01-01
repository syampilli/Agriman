const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "agriman", // 🔒 LOCK DB NAME
    });

    console.log(
      `MongoDB Connected | DB: ${conn.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection failed ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
