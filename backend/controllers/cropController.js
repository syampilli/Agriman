const Crop = require("../models/Crop");

// ADD CROP
exports.createCrop = async (req, res) => {
  try {
    const crop = await Crop.create({
      farmer: req.user._id,
      ...req.body,
    });
    res.status(201).json(crop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL CROPS
exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate("farmer", "name location");
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY CROPS (Farmer)
exports.getMyCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
