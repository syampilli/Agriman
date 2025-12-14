const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    location: String,
    description: String,
    image: String,
    contactNumber: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ SAFE EXPORT (prevents overwrite error)
module.exports =
  mongoose.models.Crop || mongoose.model("Crop", cropSchema);
