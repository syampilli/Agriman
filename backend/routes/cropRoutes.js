const express = require("express");
const router = express.Router();

const {
  createCrop,
  getCrops,
  getMyCrops,
} = require("../controllers/cropController");

const protect = require("../middleware/authMiddleware");

// GET ALL CROPS (Buyer)
router.get("/", getCrops);

// GET FARMER CROPS
router.get("/my", protect, getMyCrops);

// ADD CROP (Farmer)
router.post("/", protect, createCrop);

module.exports = router;
