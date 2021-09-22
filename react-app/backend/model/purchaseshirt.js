const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: { type: String },
  size: { type: String },
  team: { type: String },
  amount: { type: Number },
  delivery: { type: String },
  totalPrice: { type: Number },
});

module.exports = mongoose.model("purchaseshirt", userSchema);
