const Order = require("../models/Order");
const Crop = require("../models/Crop");

// BUYER PLACES ORDER
exports.placeOrder = async (req, res) => {
  try {
    const { cropId, quantity } = req.body;

    const crop = await Crop.findById(cropId).populate("farmer");
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    const totalPrice = quantity * crop.price;

    const order = await Order.create({
      buyer: req.user.id,
      farmer: crop.farmer._id,
      crop: crop._id,
      quantity,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// FARMER: GET INCOMING ORDERS
exports.getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id })
      .populate("buyer", "name email")
      .populate("crop", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FARMER: UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    // only farmer can update their order
    if (order.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// BUYER: GET MY ORDERS
exports.getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("crop", "name price")
      .populate("farmer", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
