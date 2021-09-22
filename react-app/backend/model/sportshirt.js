const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  team: { type: String },
  price: { type: Number },
  src: { type: String, default: null },
});

module.exports = mongoose.model("sportshirt", userSchema);
