const express = require("express");
const {
  placeOrder,
  getFarmerOrders,
  updateOrderStatus,
   getBuyerOrders,
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Buyer
router.post("/", protect, placeOrder);

// Farmer
router.get("/farmer", protect, getFarmerOrders);
router.put("/:id/status", protect, updateOrderStatus);
router.get("/my", protect, getBuyerOrders);

module.exports = router;
