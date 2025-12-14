const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// ✅ CORS configuration (IMPORTANT for Vercel frontend)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://agriman.vercel.app"
    ],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("AgriMan API is running 🚜🌾");
});

// Server start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
